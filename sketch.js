var dimCaselle=100;
var nRighe=3;
var nColonne=3;
var campo=[];
var vittoria;
var turno;
var canvas;
var contenitoreCampo;
var contenitoreBottone;
var testo;
var bottone;

function setup(){
    canvas=createCanvas(dimCaselle*3, dimCaselle*3.5);
    contenitoreCampo=select(".contenitoreCampo");
    canvas.parent(contenitoreCampo);

    angleMode(DEGREES);

    frameRate(60);

    contenitoreBottone=select(".contenitoreBottone");
    bottone = createButton("restart");
    bottone.mousePressed(creaCampo);
    bottone.parent(contenitoreBottone);
    
    creaCampo();
}

function draw(){
    for(var i=0; i<nRighe; i++){
        for(var j=0; j<nColonne; j++){
            campo[i][j].show();
        }
    }
    testo=select(".contenitoreTesto");
    if(!vittoria){
        testo.html("turno di: "+turno);
    } else{
        testo.html("vince "+turno);
    }
}

function creaCampo(){
    vittoria=false;
    turno="giocatore1";

    campo=[];

    background(255);

    line(dimCaselle, 0, dimCaselle, dimCaselle*nRighe);
    line(dimCaselle*2, 0, dimCaselle*2, dimCaselle*nRighe);
    line(0, dimCaselle, dimCaselle*nColonne, dimCaselle);
    line(0, dimCaselle*2, dimCaselle*nColonne, dimCaselle*2);

    for(var i=0; i<nRighe; i++){
        campo[i]=[];
        for(var j=0; j<nColonne; j++){
            campo[i][j]=new casella(dimCaselle*j, dimCaselle*i);
        }
    }
}

class casella{
    constructor(x, y){
        this.x=x;
        this.y=y;
        this.occupato=false;
        this.movimentoLinea=dimCaselle*0.20;
        this.movimentoCerchio=270;
    }

    show(){
        if(this.occupato=="giocatore1"){
            strokeWeight(3);
            point(this.x+this.movimentoLinea, this.y+this.movimentoLinea);
            point(this.x+dimCaselle-this.movimentoLinea, this.y+this.movimentoLinea);
            if(this.movimentoLinea<=dimCaselle-dimCaselle*0.20){
                this.movimentoLinea++;
            }
            strokeWeight(2);
        } else if(this.occupato=="giocatore2"){
            circle(this.x+dimCaselle/2+(dimCaselle*0.35)*cos(this.movimentoCerchio), this.y+dimCaselle/2+(dimCaselle*0.35)*sin(this.movimentoCerchio), 2);
            if(this.movimentoCerchio<270+360){
                this.movimentoCerchio+=4;
            }
        }
    }
}

function mousePressed(){
    for(var i=0; i<nRighe; i++){
        for(var j=0; j<nColonne; j++){
            if(!vittoria && campo[i][j].occupato==false && mouseX>campo[i][j].x && mouseX<campo[i][j].x+dimCaselle && mouseY>campo[i][j].y && mouseY<campo[i][j].y+dimCaselle){
                campo[i][j].occupato=turno;
                vittoria=controllaVittoria(i, j);
                if(!vittoria){
                    if(turno=="giocatore1"){
                        turno="giocatore2";
                    } else{
                        turno="giocatore1";
                    }
                }
            }
        }
    }
}

function controllaVittoria(riga, colonna){
    if(campo[riga][0].occupato==turno && campo[riga][1].occupato==turno && campo[riga][2].occupato==turno){
        line(0, riga*(dimCaselle)+(dimCaselle/2), dimCaselle*3, riga*(dimCaselle)+(dimCaselle/2));
        return true;
    } else if(campo[0][colonna].occupato==turno && campo[1][colonna].occupato==turno && campo[2][colonna].occupato==turno){
        line(colonna*(dimCaselle)+(dimCaselle/2), 0, colonna*(dimCaselle)+(dimCaselle/2), dimCaselle*3);
        return true;
    } else if(campo[0][0].occupato==turno && campo[1][1].occupato==turno && campo[2][2].occupato==turno){
        line(0, 0, dimCaselle*3, dimCaselle*3);
        return true;
    } else if(campo[0][2].occupato==turno && campo[1][1].occupato==turno && campo[2][0].occupato==turno){
        line(dimCaselle*3, 0, 0, dimCaselle*3);
        return true;
    }
}
