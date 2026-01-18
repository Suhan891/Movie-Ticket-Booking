const USE_STATUS = {
    approved: "APPROVED",
    pending: "PENDING",
    required: "REJECTED"
}

const USER_ROLE = {
    customer : "APPROVED",
    client: "ADMIN",
    admin: "CLIENT"
}

const CLIENT_ROLE = {
    movie: "Movie",
    theater: "Theater"
}

const STATUS_CODES = {
    OK: 200,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    FORBIDDEN: 403
}

module.exports = {
    USE_STATUS,
    USER_ROLE,
    STATUS_CODES,
    CLIENT_ROLE
}