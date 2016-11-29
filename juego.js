class Juego {
    constructor(){
        this.svg=document.getElementsByTagName("svg")[0];
        this.bola = new Ball(this.svg);
        this.ladrillos = [[100,100],[140,100],[180,100],[220,100],[260,100],[300,100],[340,100]];
        this.lisLad = [];
        this.crearLadrillos();
        this.barra = new Barra(this.svg);
        esto=this;
        document.addEventListener("keypress", esto.barra.mover);
        this.mover();
    }
    crearLadrillos(){
       for (let lad of this.ladrillos){
           this.lisLad.push(new Ladrillo(lad[0],lad[1],this.svg));
       } 
    }
    mover(){
        let estado = true;
        if (esto.lisLad.length===1){
            esto.bola.borrar();
            estado=false;
            alert("¡¡¡Enhorabuena has ganado!!!")
        }
        let cont = esto.bola.choqueLadrillo(esto.lisLad);
        if (cont){
            esto.lisLad.splice(cont, 1);
        }
        esto.bola.choqueBarra(esto.barra);
        esto.bola.mover();
        if (estado){
            setTimeout(esto.mover, 20);
        }
    }
}



var esto;
window.onload = function(){
    new Juego();
}