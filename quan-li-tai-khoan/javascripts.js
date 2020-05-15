$(document).ready(function(){
    $('#tableQuanLyNhanVien').DataTable({
        "paging":   true,
        "ordering": true,
        "info":     true,

        "order": [[ 0, "asc" ]]
    });
});
