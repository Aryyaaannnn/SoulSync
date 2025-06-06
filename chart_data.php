<?php
include "db/config.php";

$sql = "SELECT entry_date, mood FROM entries ORDER BY entry_date ASC";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

header('Content-Type: application/json');
echo json_encode($data);
?>