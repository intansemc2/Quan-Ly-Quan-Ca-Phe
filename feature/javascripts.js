$(document).ready(function(){
    $('#example').DataTable({
        "paging":   true,
        "ordering": true,
        "info":     true,

        "order": [[ 0, "asc" ]]
    });
});
