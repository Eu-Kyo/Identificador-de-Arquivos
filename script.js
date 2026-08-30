document.getElementById('botaoEnviar').onclick = function handleFiles(files){
    for (const file of files){
        if(!file.type.startsWith("image/")){
            continue;
        }

        const img = document.createElement("img");
        img.classList.add("obj");
        img.file = file;
        preview.appendchild(img);

        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

    }
}
const selectedFile = document.getElementById("arquivo").files[0];
