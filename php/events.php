<?php
$events = array(
  array(
    'title' => 'Event 1',
    'start' => '2022-01-01'
  ),
  array(
    'title' => 'Event 2',
    'start' => '2022-01-02'
  )
  // More events here...
);

// Set the content type to JSON
header('Content-Type: application/json');

// Send the data back to the client
echo json_encode($events);
?>