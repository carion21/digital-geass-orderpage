const express = require('express');

const { getMoment, getDirectusUrl, genOrderCode } = require('../../config/utils');
const { APP_NAME, APP_VERSION, APP_DESCRIPTION, ORDER_STATUS_STARTED, TRANSACTION_STATUS_PENDING } = require('../../config/consts');
const { control_service_data, directus_retrieve_tunnel, directus_create_order, cinetpay_execute_payment, directus_retrieve_order, directus_update_order, directus_create_transaction_log } = require('../../config/global_functions');
const router = express.Router();

const SERVICE_TYPE = "order_first_step"

const moment = getMoment();
const service = "order"

router.get('/:tunnel_code', async function (req, res, next) {
  let tunnel_code = req.params.tunnel_code

  let r_dts_tunnel = await directus_retrieve_tunnel(tunnel_code)

  if (r_dts_tunnel.success && r_dts_tunnel.data.length > 0) {
    const tunnel = r_dts_tunnel.data[0]

    let tunnel_is_available = true

    let current_date = moment().format("YYYY-MM-DD HH:mm:ss")
    let start_date = moment(tunnel.start_date).format("YYYY-MM-DD HH:mm:ss")
    let end_date = moment(tunnel.end_date).format("YYYY-MM-DD HH:mm:ss")

    if (current_date < start_date || current_date > end_date) {
      tunnel_is_available = false
    }

    res.render(
      "order/first", {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      appDescription: APP_DESCRIPTION,
      pageDescription: "Passer une commande",
      service: service,
      tunnel_is_available: tunnel_is_available,
      tunnel: tunnel
    })
  } else {
    res.render('security/notfound', {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      appDescription: APP_DESCRIPTION
    })
  }
});

router.post('/:tunnel_code', async function (req, res, next) {
  let tunnel_code = req.params.tunnel_code

  let r_dts_tunnel = await directus_retrieve_tunnel(tunnel_code)

  if (r_dts_tunnel.success && r_dts_tunnel.data.length > 0) {
    const tunnel = r_dts_tunnel.data[0]

    console.log('tunnel', tunnel);

    let tunnel_is_available = true

    let current_date = moment().format("YYYY-MM-DD HH:mm:ss")
    let start_date = moment(tunnel.start_date).format("YYYY-MM-DD HH:mm:ss")
    let end_date = moment(tunnel.end_date).format("YYYY-MM-DD HH:mm:ss")

    if (current_date < start_date || current_date > end_date) {
      tunnel_is_available = false
    }

    if (tunnel_is_available) {
      let body = req.body

      let bcontrol = control_service_data(SERVICE_TYPE, body)

      let error = ""

      if (bcontrol.success) {
        let order_code = genOrderCode()
        let order_data = {
          tunnel: tunnel.id,
          code: order_code,
          lastname: body.lastname,
          firstname: body.firstname,
          email: body.email,
          phone: body.phone,
          status: ORDER_STATUS_STARTED,
        }

        let r_dts_new_order = await directus_create_order(order_data)

        if (r_dts_new_order.success) {
          let r_dts_order = await directus_retrieve_order(order_code)
          let order = r_dts_order.data[0]

          let cnp_transaction = await cinetpay_execute_payment(order_data.code, tunnel.price)
          // let cnp_transaction = await cinetpay_execute_payment(order_data.code, 100)

          if (cnp_transaction.success) {
            let payment_url = cnp_transaction.data.payment_url

            let r_dts_upd_order = await directus_update_order({
              id: order.id,
              transaction_url: payment_url,
              transaction_status: TRANSACTION_STATUS_PENDING
            })

            if (r_dts_upd_order.success) {
              r_dts_new_tlog = await directus_create_transaction_log({
                order: order.id,
                status: TRANSACTION_STATUS_PENDING,
              })
              console.log('r_dts_new_tlog', r_dts_new_tlog);

              res.redirect(payment_url)
            } else {
              error = r_dts_upd_order.message
            }

          } else {
            error = "Erreur lors de l'exécution du paiement: " + cnp_transaction.message
          }

        } else {
          error = r_dts_new_order.message
        }
      } else {
        error = bcontrol.message
      }


      if (error) {
        res.render(
          "order/first", {
          appName: APP_NAME,
          appVersion: APP_VERSION,
          appDescription: APP_DESCRIPTION,
          pageDescription: "Passer une commande",
          service: service,
          tunnel_is_available: tunnel_is_available,
          tunnel: tunnel,
          error: error,
          rbody: body
        })
      }

    } else {
      res.redirect("/order/" + tunnel_code)
    }

  } else {
    res.redirect("/order/" + tunnel_code)
  }
});

module.exports = router;