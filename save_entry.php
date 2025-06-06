<?php
include "db/config.php";

$mood = $_POST['mood'];
$journal = $_POST['journal'];
$habits = isset($_POST['habits']) ? implode(",", $_POST['habits']) : "";
$date = date("Y-m-d");

$sql = "INSERT INTO entries (entry_date, mood, journal, habits)
        VALUES ('$date', '$mood', '$journal', '$habits')";

if ($conn->query($sql)) {
    echo "Entry saved successfully!";
} else {
    echo "Error: " . $conn->error;
}
?>