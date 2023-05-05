predction1 = "";


Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="' + data_uri + '"/>';
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/t1Io0HeH4/model.json', modelLoaded);
function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + predction1;

    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('capturedImage');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;

        predction1 = results[0].label;
  

        if (results[0].label == "Thumbs Up") {
            document.getElementById("updateEmoji").innerHTML = "👍";
        }
        if (results[0].label == "Stop") {
            document.getElementById("updateEmoji").innerHTML = "✋";
        }
        if (results[0].label == "Victory") {
            document.getElementById("updateEmoji").innerHTML = "✌️";
        }
    }
}