var dimCaselle=100;
var nRighe=3;
var nColonne=3;
var campo=[];
var vittoria=false;
var turno="giocatore1";
var bottone;

function setup(){
    createCanvas(dimCaselle*3, dimCaselle*3.5);
    
    bottone = createButton('restart');
    bottone.position(dimCaselle*1.075, dimCaselle*3.25);
    bottone.size(dimCaselle);
    bottone.mousePressed(setup);
    
    creaCampo();
}

function draw(){    
    noFill();
    for(var i=0; i<nRighe; i++){
        for(var j=0; j<nColonne; j++){
            campo[i][j].display();
        }
    }
}

function creaCampo(){
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
    }

    display(){
        if(this.occupato=="giocatore1"){
            line(this.x, this.y, this.x+dimCaselle, this.y+dimCaselle);
            line(this.x+dimCaselle, this.y, this.x, this.y+dimCaselle);
        } else if(this.occupato=="giocatore2"){
            circle(this.x+(dimCaselle/2), this.y+(dimCaselle/2), dimCaselle);
        }
    }
}

function mousePressed(){
    for(var i=0; i<nRighe; i++){
        for(var j=0; j<nColonne; j++){
            if(!vittoria && campo[i][j].occupato==false && mouseX>campo[i][j].x && mouseX<campo[i][j].x+dimCaselle && mouseY>campo[i][j].y && mouseY<campo[i][j].y+dimCaselle){
                campo[i][j].occupato=turno;
                vittoria=controllaVittoria(i, j);
                if(turno=="giocatore1"){
                    turno="giocatore2";
                } else{
                    turno="giocatore1";
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
