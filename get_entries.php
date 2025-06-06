<?php
include "db/config.php";

$sql = "SELECT * FROM entries ORDER BY entry_date DESC LIMIT 7";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<ul>";
    while ($row = $result->fetch_assoc()) {
        echo "<li><strong>{$row['entry_date']}</strong> - Mood: {$row['mood']}<br>Habits: {$row['habits']}<br><em>{$row['journal']}</em></li><br>";
    }
    echo "</ul>";
} else {
    echo "No entries found.";
}
?>