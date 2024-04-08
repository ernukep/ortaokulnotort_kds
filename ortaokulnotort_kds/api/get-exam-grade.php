<?php
include_once("./get-data.php");

$district_id = isset($_GET['district_id']) ? $_GET['district_id'] : null;
$year = isset($_GET['year']) ? $_GET['year'] : 2023;

if ($district_id !== null) {
    $sql = "SELECT school_list.school_name, lesson_list.lesson_name, exam_grade.grade_avg, exam_grade.year
            FROM exam_grade
            JOIN school_list ON exam_grade.school_id = school_list.id
            JOIN lesson_list ON exam_grade.lesson_id = lesson_list.id
            WHERE school_list.district_id = $district_id and exam_grade.year = $year;";

    echo GetData($sql);
} else {
    echo "[]";
}
