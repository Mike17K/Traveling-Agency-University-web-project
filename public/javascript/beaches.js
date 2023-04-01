document.querySelector('.page-description').addEventListener("click",(event)=>{
    const e = document.querySelector('.map');

    let logic=false;
    e.classList.forEach((e)=>{
        if(e=="hidden-map"){
            logic = true;
        }
    })

    if (logic){
        e.classList.remove("hidden-map");
        e.classList.add("show-map");
    }else{
        e.classList.remove("show-map");
        e.classList.add("hidden-map");
    }
})