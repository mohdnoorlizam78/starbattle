<?php
    $conn = mysqli_connect("localhost", "root", "", "starbattle");
    $name = $_POST['name'];
    $second = $_POST['second'];
    $score = $_POST['score'];

    $sql = "INSERT INTO info (name, time, score) VALUE ('$name','$second','$score')";
    $result = mysqli_query($conn, $sql);

    $sql2 = "SELECT * FROM info ORDER BY score, time DESC LIMIT 10";
    $result2 = mysqli_query($conn, $sql2);

    echo "<table><head><tr><th>#</th><th>Name</th><th>Time</th><th>Score</th></tr> </head></table>";
    echo "</body>";
    $i = 1;
    while($rows = mysqli_fetch_assoc($result2)){
        echo "<tr>";
        echo "<td>$i</td><td>$rows[name]</td>";
        echo "<td>$rows[time]</td>$rows[score]</td>";
        echo "</tr>";
        $i++;

    }
    echo "</tbody></table>";

?>