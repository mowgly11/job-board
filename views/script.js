const EditBtn = document.getElementById("edit-button");
const CancelBtn = document.getElementById("cancel-button");
const SaveBtn = document.getElementById("save-button");
const nameInput = document.getElementById("input-name");

let lastValue;

CancelBtn.style.display = "none";
SaveBtn.style.display = "none";

EditBtn.onclick = (e) => {
    nameInput.removeAttribute("disabled");
    lastValue = nameInput.value;
    EditBtn.style.display = "none";
    CancelBtn.style.display = "inline-block";
    SaveBtn.style.display = "inline-block";
}

CancelBtn.onclick = (e) => {
    nameInput.setAttribute("disabled", true);
    nameInput.value = lastValue;
    EditBtn.style.display = "inline-block";
    CancelBtn.style.display = "none";
    SaveBtn.style.display = "none";
}

$(document).ready(() => {
    $("#info-form").on("submit", (e) => {
        e.preventDefault();

        const value = $("#input-name").val();
        document.querySelector(".loading").classList.remove("hidden"); 

        $.ajax({
            url: "/settings/username",
            method: "post",
            contentType: "application/json",
            data: JSON.stringify({
                newName: value
            }),
            success: (res) => {
                document.querySelector(".loading").classList.add("hidden");
                if (res.error) return $("#messages").html(res.error);
                $("#messages").html(res.message);
                nameInput.setAttribute("disabled", true);
                EditBtn.style.display = "inline-block";
                CancelBtn.style.display = "none";
                SaveBtn.style.display = "none";
            }
        });
    });
});