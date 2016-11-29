class Ball {
    constructor(svg){
        this.vx = obtenerAleat(5,2);
        this.vy = obtenerAleat(5,2);
        this.svg = svg;
        this.bola = document.createElementNS("http://www.w3.org/2000/svg","circle");
        this.px = document.createAttribute("cx");
        this.py = document.createAttribute("cy");
        this.rad = document.createAttribute("r");
        this.posiInicial();
        this.dibuja();
    }
    posiInicial(){
        this.px.value = 250;
        this.py.value = 420;
    }
    dibuja(){
        this.rad.value = 15;//obtenerAleat(20,10);
        this.bola.setAttributeNode(this.px);
        this.bola.setAttributeNode(this.py);
        this.bola.setAttributeNode(this.rad);
        this.svg.appendChild(this.bola);
    }
    choquePared(){
        let radio = parseInt(this.rad.value);
        let coorX = this.px.value;
        let coorY = this.py.value;
        if(radio>=parseInt(coorX)){
            coorX = radio+1;
            this.vx=this.vx*(-1);
        }else if(radio>=parseInt(coorY)){
            coorY = radio+1;
            this.vy=this.vy*(-1);
        }else if(radio>=(parseInt(this.svg.width.animVal.value)-parseInt(coorX))){
            coorX = parseInt(this.svg.width.animVal.value)-radio-1;
            this.vx=this.vx*(-1);
        }else if(radio>=(parseInt(this.svg.height.animVal.value)-parseInt(coorY))){
            coorY = parseInt(this.svg.width.animVal.value)-radio-1;
            this.vy=this.vy*(-1);
            this.borrar();
        }
    }
    choqueLadrillo(lisLad){
        let radio = parseInt(this.rad.value);
        let coorX = this.px.value;
        let coorY = this.py.value;
        let cont=0;
        for (let lad of lisLad){
            let anch=parseInt(lad.anch.value);
            let alt=parseInt(lad.alto.value);
            let posx = parseInt(lad.posx.value);
            let posy = parseInt(lad.posy.value);
            if (lad.rectangulo.parentNode){
                if (radio>=Math.abs(posy-coorY)&&coorX>posx&&coorX<(posx+anch)){
                    this.vy=this.vy*(-1);
                    lad.borrar();
                    return cont;
                }else if (radio>=Math.abs((posy+alt)-coorY)&&coorX>posx&&coorX<(posx+anch)){
                    this.vy=this.vy*(-1);
                    lad.borrar();
                    return cont;
                }else if (radio>=Math.abs(posx-coorX)&&coorY>posy&&coorY<(posy+alt)){
                    this.vx=this.vx*(-1);
                    lad.borrar();
                    return cont;
                }else if (radio>=Math.abs((posx+anch)-coorX)&&coorY>posy&&coorY<(posy+alt)){
                    this.vx=this.vx*(-1);
                    lad.borrar();
                    return cont;
                }
            }
            cont++;
        }
    }
    choqueBarra(lad){
        let radio = parseInt(this.rad.value);
        let coorX = this.px.value;
        let coorY = this.py.value;
        let anch=parseInt(lad.anch.value);
        let alt=parseInt(lad.alto.value);
        let posx = parseInt(lad.posx.value);
        let posy = parseInt(lad.posy.value);
        if (radio>=Math.abs(posy-coorY)&&coorX>posx&&coorX<(posx+anch)){
            this.vy=this.vy*(-1);
        }
    }
    mover(){
        this.choquePared();
        this.px.value = parseInt(this.px.value) + this.vx;
        this.py.value = parseInt(this.py.value) + this.vy;
        
    }
    borrar(){
        if(this.bola.parentNode){
            this.bola.parentNode.removeChild(this.bola);
        }
    }
    
}  
    
function obtenerAleat(mayor, menor){
    return Math.floor((Math.random()*(mayor - menor)) + menor);
}
var that;