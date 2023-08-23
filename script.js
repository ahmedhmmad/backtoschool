const encodedFileName = "c3R1ZGVudE1lbnRzLmpzb24=";

const decodedFileName = atob(encodedFileName); // Decode the Base64 encoded file name

fetch(decodedFileName)
  .then((response) => response.json())
  .then((studentDB) => {
    // Get form submit event
    document
      .getElementById("student-form")
      .addEventListener("submit", function (e) {
        // Prevent default submit
        e.preventDefault();

        // Get input value
        const studentId = document.getElementById("student-id").value;

        // Lookup student in DB
        const student = studentDB[studentId];

        // Populate image
        const img = new Image();
        img.src = "backtoschool.jpeg";

        img.onload = function () {
          // Create canvas with image dimensions
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          // Draw image on canvas
          ctx.drawImage(img, 0, 0);

          // Wait for font to load
          const font = "28px Arial";
          ctx.font = font;
          ctx.fillStyle = "blue"; // Set text color
          ctx.textBaseline = "top"; // Align text to top
          ctx.fillText(student.name, 150, 380); // Adjust text position
          ctx.fillText(student.class, 150, 480); // Adjust text position

          // Display image
          const imageContainer = document.getElementById(
            "student-image-container"
          );
          imageContainer.innerHTML = "";
          imageContainer.appendChild(canvas);
        };
      });
  })
  .catch((error) => console.error("Error loading student data:", error));
