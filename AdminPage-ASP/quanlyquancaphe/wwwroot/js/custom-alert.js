let createAlerts = (alertType, content) => {
    return `<div class="alert alert-${alertType} alert-dismissible fade show" role="alert"><span>${content}</span><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`;
};