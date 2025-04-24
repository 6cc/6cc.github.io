我需要一段js代码：在页面上生成一个文本框和一个按钮。点击按钮执行文本框中的js代码

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Run JS Code</title>
</head>
<body>
<input type="text" id="jsCode" placeholder="Enter JavaScript code here">
<button onclick="runJS()">Run</button>

<script>
function runJS() {
    const jsCode = document.getElementById('jsCode').value;
    try {
        eval(jsCode);
    } catch (error) {
        console.error(error);
    }
}
</script>
</body>
</html>

请问，同样的代码在jsitor.com调试正常，但本地htm文件下面的位置会报错是怎么会是？
document.body.appendChild(textArea);

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Run JS Code</title>
</head>
<body>

<script>
document.addEventListener("DOMContentLoaded", function() {
    var textArea = document.createElement("textarea");
    var button = document.createElement("button");
    button.textContent = "Run";
    button.onclick = runJS;

    document.body.appendChild(textArea);
    document.body.appendChild(button);

    function runJS() {
        const jsCode = textArea.value;
        try {
            eval(jsCode);
        } catch (error) {
            console.error(error);
        }
    }
});
</script>
</body>
</html>
