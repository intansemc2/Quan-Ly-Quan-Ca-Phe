let createAlerts = (alertType, content, closeable = true, name = "") => {
    return `<div class="alert alert-${alertType} alert-dismissible fade show ${name}" role="alert"><span>${content}</span>${(closeable) ? `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`:` `}</div>`;
};

let removeAlerts = (container, alertType, name) => {
    return $(container).find(`.${alertType}.${name}`).remove();
};