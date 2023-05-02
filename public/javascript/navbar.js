
const links = document.querySelectorAll(".item");

links.forEach(a => {
    a.addEventListener("click",(event)=>{
        const e = event.target;
        links.forEach(link=>{
            link.classList.remove("target");
        });
        e.classList.add("target");
    });
});