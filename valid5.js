var i, j, k, i1, i2, f1, f2, same_place_counter=0, count_t, count2, count=999, flag=0,temp_top=-1,turn=0,abs_turn=-1, y,clicked=0;;
//var grid1=new Array();//Memory allocation for the grid (8*6)
var grid=new Array();//memory allocation for the grid (8*2)
var undo_array=new Array();//Memory allocation for undo array

for(y=0; y<10; y++)
{
    undo_array[y]=new Array();
}

for(i=1;i<7;i++)                        //grid initialisation
{
    /*
    grid1[i]=new Array();
    for(j=0;j<6;j++)
    {
        grid1[i][j]=new Array();
    }
    */
    grid[i]=new Array();
    grid[i][0]=1;
    grid[i][1]=1;
}
grid[0]=new Array();
grid[0][0]=6;
grid[0][1]=0;

grid[7]=new Array();
grid[7][0]=0;
grid[7][1]=6;

function checki1(row)
{
    abs_turn++;
    turn=abs_turn%2;
    i1=row;
    
    if(i1>=(turn) && i1<=(turn+6))//Checking if selected row lies within the grid
    {
        document.getElementById("test").innerHTML=i1;
        if(grid[i1][turn]>=1)//Checking if row has atleast one token of the player
        {
            if(turn==0)
            {
                document.getElementById("test").innerHTML="Player 1 : Move 1";
            }
            else if(turn==1)
            {
                document.getElementById("test").innerHTML="Player 2 : Move 1";       
            }
            //Print that selected row is valid
            document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+" i1 selected is valid";
            clicked=1;

            if(turn==0)
            return grid[i1][turn]-1;     //Left align for player 1
            else
            return 6-grid[i1][turn];     //Right align for player 2
        }
        else   
        {
            abs_turn--;
            document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+"Row selected does not contaain any of your tokens";//Print that selected row is invalid
            return 666;
        }

        if(turn==0&&(i1+1!=7))
        {
            if(grid[i1+1][0]+grid[i1+1][1]>=6)
            {
                document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+"Next row already contains 6 tokens";//Print that the landing row i.e f1 is already full
                return 666;
            }
        }   
        else if(turn==1&&(i1-1!=0))
        {
            if(grid[i1-1][0]+grid[i1-1][1]>=6)
            {
                document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+"Next row already contains 6 tokens";//Print that the landing row i.e f1 is already full
                return 666;
            }
        }   
    }
    else
    {
        abs_turn--;
        document.getElementById("test").innerHTML="Invalid row selected";//Print that selected row is invalid
        return 666;
    }
}

function checkf1(row)      //This function is for the first move only.
{
    f1=row;
    if(i1==f1)
    {
        clicked=0;
        abs_turn--;
        return 66;
    }
    if(f1>=((turn+1)%2) && f1<=(((turn+1)%2)+6))//Checking if selected row lies within the grid
    {
        if(grid[f1][0]+grid[f1][1]<=5 || f1==7)//Checking if row does not have more than 5 tokens in total
        {
            //Print that selected row is valid
            count=grid[f1][0]+grid[f1][1];
            if(turn==0)
            {
                /*if(count<=5);
                else if(f1==7);
                else
                {
                    document.getElementById("test").innerHTML="invalid1"//cout<<"Row already contains 5 tokens of both players."<<endl;
                    return 666;
                }*/
                if(f1-i1==1);
                else
                {
                    //cout<<"You have to move ahead by only one row."<<endl;
                    document.getElementById("test").innerHTML="First move can only have a difference of 1 row."//checking if first move is played correctly
                    return 666;
                }
            }
            if(turn==1)
            {
                /*if(count<=5);
                else if(f1==0);
                else
                {
                    document.getElementById("test").innerHTML="invalid3"//cout<<"Row already contains 5 tokens of both players."<<endl;
                    return 666;
                }*/
                if(i1-f1==1);
                else
                {
                    //cout<<"You have to move ahead by only one row."<<endl;
                    document.getElementById("test").innerHTML="First move can only have a difference of 1 row."//checking if first move is played correctly
                    return 666;
                }
            }
        }
        document.getElementById("test").innerHTML="f1 selected is valid";
        clicked=0;

        pushlast(i1,f1);
        grid[i1][turn]=grid[i1][turn]-1;
        grid[f1][turn]=grid[f1][turn]+1;//updating the grid after 1st move
         for(m=0;m<8;m++)
        {
            if(grid[m][0]!=0)
            break;
        }
        for(n=7;n>=0;n--)
        {
            if(grid[n][1]!=0)
            break;
        }
        if(n<m)
        {
           return 3012;
        }
        else if(turn==0)
        return grid[f1][turn]-1;
        else if(turn==1)
        return 6-grid[f1][turn];
    }

    else
    {
        document.getElementById("test").innerHTML="Invalid row selected"
        return 666;
    }
   
}

function checki2(row)
{
    i2=row;

    if(i2>=(turn) && i2<=(turn+6))//Checking if selected row lies within the grid
    {
        if(turn==0 && i2+grid[f1][0]+grid[f1][1]-1>7 && f1!=7)
        {
            document.getElementById("test").innerHTML="Token selected will go out of grid"; //out of range
            return 666;
        }

        else if(turn==1 && i2-(grid[f1][0]+grid[f1][1]-1)<0 && f1!=0)
        {
            document.getElementById("test").innerHTML="Token selected will go out of grid";// out of range
            return 666;
        }
        if(turn==0)
        {
            document.getElementById("test").innerHTML="Player 1 : Move 2";
        }
        else if(turn==1)
        {
            document.getElementById("test").innerHTML="Player 2 : Move 2";       
        }
        if(grid[i2][turn]>=1)//Checking if row has atleast one token of the player
        {
            document.getElementById("test").innerHTML=document.getElementById("test").innerHTML+" i2 selected is valid";//Print that selected row is valid
            clicked=1;

            if(turn==0)
            return grid[i2][turn]-1;
            else
            return 6-grid[i2][turn];
        }
        else
        {
            document.getElementById("test").innerHTML="Row selected does not contain any of your tokens";//Print that selected row is invalid
            return 666;
        }
    }
    else
    {
        document.getElementById("test").innerHTML="Invalid row";//Print that selected row is invalid
        return 666;
    }
}

function checkf2(row)
{
    f2=row;
    if((f2==i2) && grid[f1][0]+grid[f1][1]-1!=0)
    {
        clicked=0;
        return 66;
    }
    /*if((f2==i2) && count!=0)
    {
        document.getElementById("test").innerHTML="invalid row";//Print move is invalid     
        return 666;
    }*/
    if(f2<((turn+1)%2) || f2>(((turn+1)%2)+6))//Checking if selected row does not lie within the grid
    {
        document.getElementById("test").innerHTML="Invalid row selected";//Print move is invalid
        return 666;
    }
    if(turn==0&&f1==7)
    {
        if(f2-i2!=1)
        {
            document.getElementById("test").innerHTML="Move of length 1 expected";//Print move is invalid
            return 666;
        }
    }
    else if(turn==1&&f1==0)
    {
        if(i2-f2!=1)
        {
            document.getElementById("test").innerHTML="Move of length 1 expected";//Print move is invalid
            return 666;
        }
    }
    else if(grid[f1][0]+grid[f1][1]-1!=(f2-i2)&&turn==0)
    {
        document.getElementById("test").innerHTML="You are to move by only "+count+" rows.";//return invalid
        return 666;
    }
    else if(grid[f1][0]+grid[f1][1]-1!=(i2-f2)&&turn==1)
    {
        document.getElementById("test").innerHTML="You are to move by only "+count+" rows.";//return invalid
        return 666;
    }
    else if(grid[f2][0]+grid[f2][1]>5 && f2!=7 && f2!=0) //Checking if row does not have more than 5 tokens in total
    {
        document.getElementById("test").innerHTML="Landing row is full";//Print that selected row is invalid
        return 666;
    }

        
    document.getElementById("test").innerHTML="f2 selected is valid";//Print that selected row is valid
    clicked=0;

    pushlast(i2,f2);
    grid[i2][turn]=grid[i2][turn]-1;
    grid[f2][turn]=grid[f2][turn]+1;//Updating the grid after the second move
        //Return grid position only
         for(m=0;m<8;m++)
        {
            if(grid[m][0]!=0)
            break;
        }
        for(n=7;n>=0;n--)
        {
            if(grid[n][1]!=0)
            break;
        }
        if(n<m)
        {
           return 3012;
        }
        
        else if(turn==0) 
        return grid[f2][turn]-1;
        else if(turn==1)
        return 6-grid[f2][turn];
       
}
function score()
{
    score_1=1*grid[4][0]+2*grid[5][0]+3*grid[6][0]+5*grid[7][0];
    score_2=5*grid[0][1]+3*grid[1][1]+2*grid[2][1]+1*grid[3][1];
    if(score_1>score_2)
    {
        document.getElementById("test").innerHTML=writeTextColor(small_green, "Game over. Player I wins. Score is "+score_1+" : "+score_2);//Displaying player one is the winner
    }
    if(score_2>score_1)
    {
        document.getElementById("test").innerHTML=writeTextColor(small_blue, "Game over. Player II wins. Score is "+score_1+" : "+score_2);//Displaying player two is the winner
    }
    if(score_1==score_2)
    {
        document.getElementById("test").innerHTML=writeTextColor(small_red, "Game over. It is a draw. Score is "+score_1+" : "+score_2);//Displaying if the game ended in a draw
    }
}

function pushlast(i,f)
{   
    document.getElementById("test").innerHTML=temp_top;
    var shifter;
    if(temp_top<9)
    {
        temp_top++;
        document.getElementById("test").innerHTML=i+","+f;
        undo_array[temp_top][0]=i;
        undo_array[temp_top][1]=f;
    }
    else if(temp_top==9)
    {
        for(shifter=0; shifter<8; shifter=shifter+2)
        {
            undo_array[shifter][0]=undo_array[shifter+2][0];
            undo_array[shifter][1]=undo_array[shifter+2][1];
            undo_array[shifter+1][0]=undo_array[shifter+3][0];
            undo_array[shifter+1][1]=undo_array[shifter+3][1];

        }
        temp_top=8;
        undo_array[temp_top][0]=i;
        undo_array[temp_top][1]=f;
    }
}

function poplast()
{
    if(temp_top==-1 && clicked==1)
    {
        clicked=0;
        abs_turn--;
        return 66;
    }
    else if(temp_top==-1)
    {
        return 666;
    }
    var returnvalue;
    i=undo_array[temp_top][0];
    f=undo_array[temp_top][1];
    
    document.getElementById("test").innerHTML=turn;

    if(clicked==1 && temp_top%2==1)
    {
        clicked=0;
        abs_turn--;
        return 66;
    }

    else if (clicked==1)
    {
        clicked=0;
        return 66;
    }


    if(turn==0)
    {
        if(temp_top%2==0)
        {
            abs_turn--;
            turn=abs_turn%2;
        }
            temp_top--;
        pf=grid[f][0]-1;
        pi=grid[i][0];
        if(i==f)
            pi=pf;
        grid[f][0]=grid[f][0]-1;
        grid[i][0]=grid[i][0]+1;//updating the grid after undo
        returnvalue=f*1000+pf*100+i*10+pi;
        //document.getElementById("test").innerHTML=returnvalue;
        return f*1000+pf*100+i*10+pi;
    }
    else if(turn==1)
    {
    if(temp_top%2==0)
        {
            abs_turn--;
            turn=abs_turn%2;
        }
        temp_top--;
        pf=6-grid[f][1];
        pi=6-grid[i][1]-1;
        if(i==f)
            pi=pf;
        grid[f][1]=grid[f][1]-1;
        grid[i][1]=grid[i][1]+1;//updating the grid after undo
        return f*1000+pf*100+i*10+pi;
    }
}