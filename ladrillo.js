class Ladrillo {
    constructor(px,py,svg){
        this.svg = document.getElementsByTagName("svg")[0];
        this.rectangulo = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.posx = document.createAttribute("x");
        this.posy = document.createAttribute("y");
        this.anch = document.createAttribute("width");
        this.alto = document.createAttribute("height");
        this.dibuja(px,py);
    }
    dibuja(px,py){
        this.posx.value = px;
        this.posy.value = py;
        this.anch.value = 40;
        this.alto.value = 20;
        this.meterAtrib();
        this.svg.appendChild(this.rectangulo);
    }
    meterAtrib(){
        this.rectangulo.setAttributeNode(this.posx);
        this.rectangulo.setAttributeNode(this.posy);
        this.rectangulo.setAttributeNode(this.anch);
        this.rectangulo.setAttributeNode(this.alto);
    }
    borrar(){
        if(this.rectangulo.parentNode){
            this.rectangulo.parentNode.removeChild(this.rectangulo);
        }
    }
}
var it;
class Barra extends Ladrillo {
    constructor(svg){
        super(210,440,svg);
        this.anch.value = 80;
        it = this;
    }
    mover(e){
        switch (e.key){
                //izq 37; der 39;
            case "a":
            case "A":
                if(it.choqueParedIzq()){
                    it.posx.value = parseInt(it.posx.value)-10;
                }
                break;
            case "d":
            case "D":
                if (it.choqueParedDer()){
                    it.posx.value = parseInt(it.posx.value)+10;
                }
                break;
        }
        
    }
    choqueParedIzq(){
        let coordx=parseInt(it.posx.value);
        if (coordx<10){
            return false;
        } return true;
    }
    choqueParedDer(){
        let coordx=parseInt(it.posx.value);
        if (coordx>410){
            return false;
        } return true;
    }
}


/*
y es la distancia del borde sup a la pared sup
x es la distancia del borde a la pared izq
<rect x="50" y="20" width="150" height="150"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9" />*/