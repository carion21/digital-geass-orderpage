
class Consts {
    static NLIMIT = 10;

    static PORT_SYSTEM = 3000;
    static APP_NAME = "DigitalGeass"
    static APP_AUTHOR = "Carion21"
    static APP_VERSION = "1.0.0"
    static APP_DESCRIPTION = "Système de gestion des ventes de produits numériques"

    static DEFAULT_TYPES = [
        "string",
        "string_not_empty",
        "string_email",
        "string_date",
        "string_integer",
        "string_boolean",
        "number",
        "integer",
        "boolean",
        "object",
        "array",
        "array_of_string",
        "array_of_number",
        "array_of_integer",
        "array_of_boolean",
        "array_of_object",
        "array_of_string_integer"
    ];

    static DEFAULT_DURATION_OF_ORDER = 2; // minutes
    static DEFAULT_PRICE_VALUE = 3000;

    static ROUTE_OF_DIRECTUS_FOR_DGEASS_PRODUCT = "/items/dgeass_product"
    static ROUTE_OF_DIRECTUS_FOR_DGEASS_TUNNEL = "/items/dgeass_tunnel"
    static ROUTE_OF_DIRECTUS_FOR_DGEASS_ORDER = "/items/dgeass_order"
    static ROUTE_OF_DIRECTUS_FOR_DGEASS_TRANSACTION_LOG = "/items/dgeass_transaction_log"

    static ORDER_STATUS_STARTED = "started"
    static ORDER_STATUS_COMPLETED = "completed"
    static ORDER_STATUS_ABANDONED = "abandoned"
    static ORDER_STATUS_FAILED = "failed"

    static ORDER_STATUSES = [
        Consts.ORDER_STATUS_STARTED,
        Consts.ORDER_STATUS_COMPLETED,
        Consts.ORDER_STATUS_ABANDONED,
        Consts.ORDER_STATUS_FAILED
    ];

    static ORDER_STATUSES_LABELS_EN = {
        [Consts.ORDER_STATUS_STARTED]: "Started",
        [Consts.ORDER_STATUS_COMPLETED]: "Completed",
        [Consts.ORDER_STATUS_ABANDONED]: "Abandoned",
        [Consts.ORDER_STATUS_FAILED]: "Failed"
    }

    static ORDER_STATUSES_LABELS_FR = {
        [Consts.ORDER_STATUS_STARTED]: "Démarré",
        [Consts.ORDER_STATUS_COMPLETED]: "Terminé",
        [Consts.ORDER_STATUS_ABANDONED]: "Abandonné",
        [Consts.ORDER_STATUS_FAILED]: "Échoué"
    }

    static ORDER_STATUSES_LABELS = Consts.ORDER_STATUSES_LABELS_FR;

    static ORDER_STATUSES_BADGES = {
        [Consts.ORDER_STATUS_STARTED]: "badge bg-primary",
        [Consts.ORDER_STATUS_COMPLETED]: "badge bg-success",
        [Consts.ORDER_STATUS_ABANDONED]: "badge bg-warning",
        [Consts.ORDER_STATUS_FAILED]: "badge bg-danger"
    }

    static TRANSACTION_STATUS_PENDING = 1
    static TRANSACTION_STATUS_ACCEPTED = 2
    static TRANSACTION_STATUS_REFUSED = 3

    static TRANSACTION_STATUSES = [
        Consts.TRANSACTION_STATUS_PENDING,
        Consts.TRANSACTION_STATUS_ACCEPTED,
        Consts.TRANSACTION_STATUS_REFUSED
    ];

    static TRANSACTION_STATUSES_LABELS_EN = {
        [Consts.TRANSACTION_STATUS_PENDING]: "Pending",
        [Consts.TRANSACTION_STATUS_ACCEPTED]: "Accepted",
        [Consts.TRANSACTION_STATUS_REFUSED]: "Refused"
    }

    static TRANSACTION_STATUSES_LABELS_FR = {
        [Consts.TRANSACTION_STATUS_PENDING]: "En attente",
        [Consts.TRANSACTION_STATUS_ACCEPTED]: "Accepté",
        [Consts.TRANSACTION_STATUS_REFUSED]: "Refusé"
    }

    static TRANSACTION_STATUSES_LABELS = Consts.TRANSACTION_STATUSES_LABELS_FR;

    static TRANSACTION_STATUSES_BADGES = {
        [Consts.TRANSACTION_STATUS_PENDING]: "badge bg-primary",
        [Consts.TRANSACTION_STATUS_ACCEPTED]: "badge bg-success",
        [Consts.TRANSACTION_STATUS_REFUSED]: "badge bg-danger"
    }

    static PRODUCT_TYPE_ZIP = "zip";
    static PRODUCT_TYPE_PDF = "pdf";
    static PRODUCT_TYPE_AUDIO = "audio";

    static PRODUCT_TYPES = [
        Consts.PRODUCT_TYPE_ZIP,
        Consts.PRODUCT_TYPE_PDF,
        Consts.PRODUCT_TYPE_AUDIO
    ];

    static SERVICE_TYPES = [
        "undefined",
        "order_first_step",
    ];

    static SERVICE_TYPES_FIELDS = {
        "undefined": {},
        "order_first_step": {
            "fields": ["lastname", "firstname", "email", "phone"],
            "types": ["string", "string", "string_email", "string"],
            "required": ["lastname", "firstname", "email", "phone"]
        },
    };

}

module.exports = Consts;