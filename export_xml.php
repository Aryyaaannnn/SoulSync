<?php
include "db/config.php";

header("Content-Type: text/xml");

$xml = new DOMDocument("1.0", "UTF-8");
$root = $xml->createElement("entries");

$result = $conn->query("SELECT * FROM entries ORDER BY entry_date DESC");

while ($row = $result->fetch_assoc()) {
    $entry = $xml->createElement("entry");

    $entry->appendChild($xml->createElement("date", $row['entry_date']));
    $entry->appendChild($xml->createElement("mood", $row['mood']));
    $entry->appendChild($xml->createElement("journal", htmlspecialchars($row['journal'])));
    $entry->appendChild($xml->createElement("habits", $row['habits']));

    $root->appendChild($entry);
}

$xml->appendChild($root);
echo $xml->saveXML();
?>