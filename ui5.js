var canvas;
var c;
var canvas1;
var c1;
var canvas2;
var c2;
var rowSize1=65;
var rowSize2=560;
var cursorX=new Array(1,2);
var cursorY=new Array(1,2);
var gridY1;
var lineSize1=5;
var lineSize2=560;
var flag1=0;
var flag2=0;
var turner=0;
var move=1; 
var pawncolour;
var valid;
var base_count0=0;
var base_count1=0;
var done=0;
var input_i1,input_f1,input_i2,input_f2;
var winflag=0;
var greenbase=0,bluebase=0;
var count;

//initialised the colours. can be changed.
 var small_green="#7FFFD4";
 var big_green="#008B8B";
 var small_blue="#1C86EE";
 var big_blue="#22316C";
 var select_green="#79CDCD";		//colour 3
 var select_blue="#838EDE";		//colour 4
 
 function writeTextColor(thecolor,thetext)
   {
    return '<span style="color:'+thecolor+';font-size:30px">'+thetext+'</span>';
   }
function erase()
{
	document.getElementById("themove").value="";
}
function color1()
{
    j=0;
    var m;
    for(m=0;m<=560;m+=70)
    {
	  c.beginPath();
	  c.rect(j,m,rowSize2,rowSize1);
	  c.fillStyle="black";
	  c.fill();
    }
 }

function color2()
 {
   j=0;
   var m;
   for(m=65;m<490;m+=70)
   {
	 c.beginPath();
	 c.rect(j,m,lineSize2,lineSize1);
	 c.fillStyle="white";
	 c.fill();
    }
 }


function color3(pam1,pam2)
 {
			
	c.beginPath();
    c.rect(pam1,pam2,rowSize2,rowSize1);
    c.fillStyle=select_green;
    c.fill();	
					
 }

 function color4(pam1,pam2)
 {
			
	c.beginPath();
    c.rect(pam1,pam2,rowSize2,rowSize1);
    c.fillStyle=select_blue;
    c.fill();	
					
 }
function drawPawn(pawncolour,PlayerColour,x,y)
{
	c1.beginPath();
	c1.rect(x,y,35,35);
	c1.fillStyle=PlayerColour;
	c1.fill();
	c1.closePath();	
	c1.beginPath();
	c1.rect(x,y,25,25);
	c1.fillStyle=pawncolour;
	c1.fill();
	c1.closePath();	
			
}

function animate(x1,y1,x2,y2,pawncolour,PlayerColour,count)
 {
    c2.clearRect(x1-27,y1-27,93,65);                                          
    c2.beginPath();
	c2.rect(x1,y1,35,35);
	c2.fillStyle=pawncolour;
	c2.fill();
	c2.closePath();	
	c2.beginPath();
	c2.rect(x1,y1,25,25);
	c2.fillStyle=PlayerColour;
	c2.fill();
	c2.closePath();	

    if(y2>y1){y1=y1+1;}
    else if(y2<y1){y1=y1-1;}
    else if(x2>x1){x1=x1+1;}  
    else if(x2<x1){x1=x1-1;}
    if((x1==x2)&&(y1==y2))
	 {
	  c2.clearRect(x1-27,y1-27,93,65);
      drawPawn(PlayerColour,pawncolour,x2,y2);
	 }
    if((x1!=x2)||(y1!=y2))		
	{
        setTimeout(animate,1,x1,y1,x2,y2,pawncolour,PlayerColour,count);
    }
				
 }

 
 function animateundo(x1,y1,x2,y2,pawncolour,PlayerColour)
 {
    c2.clearRect(x1-27,y1-27,93,65);                                          
    c2.beginPath();
	c2.rect(x1,y1,35,35);
	c2.fillStyle=pawncolour;
	c2.fill();
	c2.closePath();	
	c2.beginPath();
	c2.rect(x1,y1,25,25);
	c2.fillStyle=PlayerColour;
	c2.fill();
	c2.closePath();	

    if (x2<x1){x1=x1-1;}
    else if(x2>x1){x1=x1+1;}
    else if(y2>y1){y1=y1+1;}
    else if(y2<y1){y1=y1-1;}
    if((x1==x2)&&(y1==y2))
	 {
	  c2.clearRect(x1-27,y1-27,93,65);
	  drawPawn(PlayerColour,pawncolour,x2,y2);
	 
	 }
    if((x1!=x2)||(y1!=y2))		
	{
        setTimeout(animateundo,1,x1,y1,x2,y2,pawncolour,PlayerColour,count);
    }
				
 }
function singleclick(e)
 { 
   if(winflag!=1)
   { 
 	if(turner%2==0)
    {  
    	if(move<=2)  
        {
            
            var rect = canvas.getBoundingClientRect();
		    cursorX = e.clientX - rect.left;
		    cursorY = e.clientY - rect.top;
		    if(cursorX<0||cursorX>canvas.width||cursorY<0||cursorY>canvas.width)
            {
            }
		    else
			{
				flag1=flag1+1; 
			    gridY1=Math.floor(cursorY/70);
			    prev=gridY1;
			   	//document.getElementById("test").innerHTML=gridY1;

			    if(flag1%2!=0)
			    {
			    	if(move==1)
			    	{
			    		document.getElementById("test").innerHTML="checki1";
			    		valid=checki1(gridY1);
			    	}
			    	else
			    	{
			    		document.getElementById("test").innerHTML="checki2";
			    		valid=checki2(gridY1);
			    	}
			    	if(valid==666)
			    	{
			    		flag1--;//invalid
			    	}
			    	else if(valid==3012)
			    	{
			    		winflag=1;
			    		score();
			    	}
			    	
			    	else
			    	{
			    		color3(0,gridY1*70);
				      	x1=(valid*93)+29;
				      	y1=(gridY1*70)+16;
			      	}
			    }
                else
                {  
                	if(move==1)
                	{
                		document.getElementById("test").innerHTML="checkf1";
			    		valid=checkf1(gridY1);
			    	}
			    	else
			    	{
			    		document.getElementById("test").innerHTML="checkf2";
			    		valid=checkf2(gridY1);
			    	}
			    	if(valid==666)
			    	{
			    		flag1--;//invalid
			    	}
			    	else if(valid==66)
			    	{
			    	document.getElementById("test").innerHTML="Deselected";
			    		color1();
			    		flag1=0;
			    		
			    	}
			    	else if(valid==3012)
			    	{
			    		winflag=1;
			    		score();
			    	}
			    	
			    	else
			    	{
			    		/*x2=5*70+29;
	              		y2=gridY1*70+16;
	                	c1.clearRect(x1-27,y1-27,93,65);
	                 	animate(x1,y1,x2,y2,"#00BFFF",big_blue);
	                 	color1();
	                  	flag2=0; 
	                  	move++;*/
	                  color3(0,gridY1*70);
	                  x2=valid*93+29;
	                  y2=gridY1*70+16;

	                  c1.clearRect(x1-27,y1-27,93,65);
	                  if(gridY1==7)
	                  {
	                  	base_count1++;
	                  	animate(x1,y1,-50,y2,big_green,small_green,valid);

	                  	document.getElementById("box1").innerHTML=writeTextColor(small_green,"+"+base_count1);
	                  }

	                  else
	                  {
	                  	animate(x1,y1,x2,y2,big_green,small_green,valid);
	             	  }
	                  color1();
	                  flag1=0; 
	                  move++;
	                  
              		}
              		
                }
            }

            if(move==3)
            { 
              turner++;
              move=1;
                     
            }                                                  

		} 
	}                           
    else
    {   
         if(move<=2)  
         { 
	        var rect = canvas.getBoundingClientRect();
	        cursorX = e.clientX - rect.left;
	        cursorY = e.clientY - rect.top;
	        if(cursorX<0||cursorX>canvas.width||cursorY<0||cursorY>canvas.width)
		    {
		    }
	        else
			{
				flag2=flag2+1; 
			    gridY1=Math.floor(cursorY/70);
			    //document.getElementById("test").innerHTML=gridY1;
				
		        if(flag2%2==1)
	      		{
	      			if(move==1)
	      			{
	      				document.getElementById("test").innerHTML="checki1";
			    		valid=checki1(gridY1);
			    	}
			    	else
			    	{
			    		document.getElementById("test").innerHTML="checki2";
			    		valid=checki2(gridY1);
			    	}
			    	if(valid==666)
			    	{
			    		flag2--;//invalid
			    	}
			    	else if(valid==3012)
			    	{
			    		winflag=1;
			    		score();
			    	}
			    	
			    	else
			    	{
			    		color4(0,gridY1*70);
				      	x1=valid*93+29;
				      	y1=gridY1*70+16;
			      	}
	      		}
                else
              	{ 
              		if(move==1)
              		{
              			document.getElementById("test").innerHTML="checkf1";
			    		valid=checkf1(gridY1);
			    	}
			    	else
			    	{
			    		document.getElementById("test").innerHTML="checkf2";
			    		valid=checkf2(gridY1);
			    	}
			    	if(valid==666)
			    	{
			    		flag2--;//invalid
			    	}
			    	else if(valid==66)
			    	{
			    		color1();
			    		flag2=0;
			    	}
			    	else if(valid==3012)
			    	{
			    		winflag=1;
			    		score();
			    	}
			    	else
			    	{
			    		color4(0,gridY1*70);
	              		x2=valid*93+29;
	              		y2=gridY1*70+16;

	              		c1.clearRect(x1-27,y1-27,93,65);
	              		if(gridY1==0)
	                  	{
	                  		base_count0++;
	                  		animate(x1,y1,8*70+16,y2,big_blue,small_blue,valid);
	                  		document.getElementById("box0").innerHTML=writeTextColor(small_blue,"+"+base_count0);
	                 	}

	                 	else
	                 	{
	                 	animate(x1,y1,x2,y2,big_blue,small_blue,valid);
	                 	}

	                 	color1();
	                  	flag2=0; 
	                  	move++;

	                  	
                  	}

      
              	} 
	                    
		        
		    }

		
                if(move==3)
                {
                	turner++;
                    move=1;
                }

          }                                                  
            	
      }
 }
}

 function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
function takeInput()
{
  if(winflag!=1)
  {
	var input_str=document.getElementById("themove").value;   //x1y1x2y2
	var positions=input_str.split(",");
	var i=parseInt(positions[0]);
	var f=parseInt(positions[1]);
	if(i>=0 && i<=7 && f>=0 && f<=7)
	{

	 	if(move==1)
	 	{
	 		if(flag1%2==1)
		 	{
		 		var temp=checkf1(gridY1);
		 		flag1=0;
		 		color1();
		 	}
		 	else if(flag2%2==1)
		 	{
		 		var temp=checkf1(gridY1);
		 		flag2=0;
		 		color1();
		 	}
		    
	 		checkFirst(i,f);
	 	}
	 	else if(move==2)
	 	{
	 		if(flag1%2==1)
		 	{
		 		var temp=checkf2(gridY1);
		 		flag1=0;
		 		color1();
		 	}
		 	else if(flag2%2==1)
		 	{
		 		var temp=checkf2(gridY1);
		 		flag2=0;
		 		color1();
		 	}
	 		checkSecond(i,f);
	 	}
 }
}
}

function checkFirst(i1,f1)
{
	
	var x1,y1,x2,y2;
	valid=checki1(i1);
	if(valid==666)
	{
		return;//invalid

	}
	else if(valid==66)
	{
		color1();
		flag2=0;
	}
	else if(valid==3012)
	{
		winflag=1;
		score();
	}
	else
	{
		x1=(valid*93)+29;
		y1=(i1*70)+16;
	}

	valid=checkf1(f1);
	if(valid==666)
	{
		return;//invalid
	}
	else
	{
		x2=(valid*93)+29;
		y2=f1*70+16;

	if(turner%2==0)
		 color3(0,i1*70)
		else
			color4(0,i1*70)

  	sleep(500).then(() => {
    c1.clearRect(x1-27,y1-27,93,65);
    if(turner%2==0)
    {
    	color1();
    	if(f1==7)
	    {
	        base_count1++;
	        animate(x1,y1,-50,y2,big_green,small_green,valid);
	        document.getElementById("box1").innerHTML=writeTextColor(small_green,"+"+base_count1);
	    }
	      else
			animate(x1,y1,x2,y2,big_green,small_green,valid);
		move=2;
	}
	else
	 {
	 	color1();
	 	if(f1==0)
	    {
	        base_count0++;
	        animate(x1,y1,8*70+16,y2,big_blue,small_blue,valid);
	        document.getElementById("box0").innerHTML=writeTextColor(small_blue,"+"+base_count0);
	    }
	    else
	    {
		animate(x1,y1,x2,y2,big_blue,small_blue,valid);
	   
	    }

	     move=2;
    }
	});

	
	
   }
	
}

function checkSecond(i2,f2)
{
	var x3,y3,x4,y4;
	valid=checki2(i2);
	if(valid==666)
	{
		return;//invalid
	}
	else if(valid==66)
	{
		color1();
		flag2=0;
	}
	else if(valid==3012)
	{
		winflag=1;
		score();
	}
	else
	{
		x3=(valid*93)+29;
		y3=(i2*70)+16;
	}

	valid=checkf2(f2);
	if(valid==666)
	{
		return;//invalid
	}
	else
	{
		x4=(valid*93)+29;
		y4=f2*70+16;

		if(turner%2==0)
		 color3(0,i2*70)
		else
			color4(0,i2*70)

	  	sleep(500).then(() => {
	    c1.clearRect(x3-27,y3-27,93,65);
	    if(turner%2==0)
	    {
	      color1();
    	  if(f2==7)
	      {
	        base_count1++;
	        animate(x3,y3,-50,y4,big_green,small_green,valid);
	        document.getElementById("box1").innerHTML=writeTextColor(small_green,"+"+base_count1);	        
	      }
	      else
		  	animate(x3,y3,x4,y4,big_green,small_green,valid);
	   	}
		 else
		 {
		 	color1();
		 	if(f2==0)
		    {
		        base_count0++;
		        animate(x3,y3,8*70+16,y4,big_blue,small_blue,valid);
		        document.getElementById("box0").innerHTML=writeTextColor(small_blue,"+"+base_count0);
		    }
		    else
		    {
			animate(x3,y3,x4,y4,big_blue,small_blue,valid);	    
		    }

	    }

	    move=1;
	    turner++;
		
		});

		
	}

}          
			 			
function undomove()
{
   if(winflag!=1)
   {
	var positions=parseInt(poplast());
	if(positions==666){}
	else if(positions==66)
	{
		color1();
		if(turner%2==0)
			flag1=0;
		else
			flag2=0;
	}
	else
	{
		color1();
		x2=positions%10;
		positions=Math.floor(positions/10);
		y2=positions%10;
		positions=Math.floor(positions/10);
		x1=positions%10;
		positions=Math.floor(positions/10);
		y1=positions%10;
		positions=Math.floor(positions/10);
		
		document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+"+"+x1;
		document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+y1;
		document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+x2;
		document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+y2;

		x2=x2*93+29;
		y2=y2*70+16;

		if(y1==7)
		{
			base_count1--;
	        document.getElementById("box1").innerHTML=writeTextColor(small_green,"+"+base_count1);	
	        x1=-1*93+29;        
		}
		else if(y1==0)
		{
			base_count0--;
	        document.getElementById("box0").innerHTML=writeTextColor(small_blue,"+"+base_count0);
	        x1=7*93+29;	        
		}
		else
		{
			x1=x1*93+29;
		}

		y1=y1*70+16;

		
		document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+"+"+turner;
		
		
		if(move==1)
		{
			turner=(turner+1)%2;
			move=2;
		}
		else
		{
			move=1;
		}
		
		if(turner%2==0)
		{
			flag1=0;
			c1.clearRect(x1-27,y1-27,93,65);
			drawPawn(small_green,big_green,x2,y2);
		}

		if(turner%2==1)
		{
			flag2=0;
			//move--;
			
			c1.clearRect(x1-27,y1-27,93,65);
			drawPawn(small_blue,big_blue,x2,y2);
		}


	}
  }

} 
window.onload=function()
	{
		canvas =document.getElementById("canvas");  //for canvas the variable used is c
        c=canvas.getContext("2d"); 
		canvas.width = 560;
		canvas.height = 560;
        canvas1=document.getElementById("canvas1");  //for canvas1 the variable used is c1 which is for pawns
		c1=canvas1.getContext("2d");
        canvas2=document.getElementById("canvas2");  //for canvas2 the variable used is c2 which is for animation
        c2=canvas2.getContext("2d");

        color1();
        color2();
        drawPawn(small_green,big_green,29,16);                             
	    drawPawn(small_green,big_green,29+93,16);
	    drawPawn(small_green,big_green,29+(2*93),16);
		drawPawn(small_green,big_green,29+(3*93),16);
		drawPawn(small_green,big_green,29+(4*93),16);
		drawPawn(small_green,big_green,29+(5*93),16);

		drawPawn(small_green,big_green,29,16+70);
		drawPawn(small_green,big_green,29,16+(2*70));
		drawPawn(small_green,big_green,29,16+(3*70));
		drawPawn(small_green,big_green,29,16+(4*70));
		drawPawn(small_green,big_green,29,16+(5*70));
		drawPawn(small_green,big_green,29,16+(6*70));
		

		drawPawn(small_blue,big_blue,29,16+(7*70));
		drawPawn(small_blue,big_blue,29+93,16+(7*70));
		drawPawn(small_blue,big_blue,29+(93*2),16+(7*70));
		drawPawn(small_blue,big_blue,29+(93*3),16+(7*70));
		drawPawn(small_blue,big_blue,29+(93*4),16+(7*70));
		drawPawn(small_blue,big_blue,29+(93*5),16+(7*70));
		/*drawPawn("#00BFFF",35+(93*6),505);
		drawPawn("#00BFFF",35+(93*7),505);*/

		drawPawn(small_blue,big_blue,494,16+70);
		drawPawn(small_blue,big_blue,494,16+(2*70));
		drawPawn(small_blue,big_blue,494,16+(3*70));
		drawPawn(small_blue,big_blue,494,16+(4*70));
		drawPawn(small_blue,big_blue,494,16+(5*70));
		drawPawn(small_blue,big_blue,494,16+(6*70));
        document.addEventListener("click",singleclick);                                   
 }	