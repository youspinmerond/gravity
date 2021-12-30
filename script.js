console.clear()

const canvas = document.getElementsByClassName('canvas')[0];
let ctx = canvas.getContext('2d');
ctx.moveTo(0, 150);
let t = 0

let fst = document.getElementsByClassName("fst")[0]
fst.style.left = "0px"
fst.style.top = "450px"
let scnd = document.getElementsByClassName("scnd")[0]
scnd.style.left = "1250px"
scnd.style.top = "450px"
let stat = document.getElementById("stat")

let xx = document.getElementsByClassName('x')[0]
let yy = document.getElementsByClassName('y')[0]

fst.velocity = {
    x:2,
    y:-1
}
fst.weight = 15
scnd.velocity = {
    x:0,
    y:0
}
scnd.weight = 170

clrs = () => {
    let k = ''
    for(i=0;i<=5;i++)
    {
        k += Math.round(Math.random()*10).toString(16)
    }
    return k;
}
let clr = "#fff"

let move = (obj1,obj2) => {
    // F = ma, Fg = G(m1m2)/r**2
    let r = Math.abs(scnd.style.left.slice(0,-2) - fst.style.left.slice(0,-2)) + Math.abs(scnd.style.top.slice(0,-2) - fst.style.top.slice(0,-2))
    let Fg = (obj1.weight*obj2.weight)/r**2
    if(Fg > 20) Fg = 20
    

    // MOVING X

    fst.style.left = Number(fst.style.left.slice(0,-2)) + Number(fst.velocity.x) + 'px'
    if(Number(fst.style.left.slice(0,-2)) > Number(scnd.style.left.slice(0,-2)))
    {
        fst.velocity.x-=Fg
        if(Number(fst.velocity.x)<-20)
        {
            fst.velocity.x = -20
        } else if(fst.velocity.x>20)
        {
            fst.velocity.x = 20
        }
    } else {
        fst.velocity.x+=Fg
	if(Number(fst.velocity.x)<-20)
        {
            fst.velocity.x = -20
        } else if(fst.velocity.x>20)
        {
            fst.velocity.x = 20
        }
    }

    // MOVING Y

    fst.style.top = Number(fst.style.top.slice(0,-2)) + Number(fst.velocity.y) + 'px'
    if(Number(fst.style.top.slice(0,-2)) > Number(scnd.style.top.slice(0,-2)))
    {
        fst.velocity.y-=Fg
        if(Number(fst.velocity.y)<-10)
        {
            fst.velocity.y = -10
        } else if(fst.velocity.y>10)
        {
            fst.velocity.y = 10
        }
    } else {
        fst.velocity.y+=Fg
        if(Number(fst.velocity.y)<-10)
        {
            fst.velocity.y = -10
        } else if(fst.velocity.y>10)
        {
            fst.velocity.y = 10
        }
    }
    
    //console.log("Fg=", Fg, "\nrad=", r**2)
    stat.innerHTML = `radius = ${Math.abs(r.toFixed(6))}<br>
                      Fg     = ${Math.abs(Fg.toFixed(6))}<br>
                      Vx1 = ${Math.abs(fst.velocity.x.toFixed(6))}<br>
                      Vy1 = ${Math.abs(fst.velocity.y.toFixed(6))}<br>
                      Speed = ${Math.abs(Number(fst.velocity.y) + Number(fst.velocity.x)).toFixed(2)}<br>
                      Boosting = ${Math.abs(Fg / fst.weight).toFixed(6)}`
}

let drawing = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = clr
    ctx.stroke()
    ctx.lineTo(t, Math.abs(canvas.height - Math.abs(fst.velocity.x + fst.velocity.y) * 10));
    t += .1
    if(t>= canvas.width)
    {
        // clr = "#" + clrs()
        t = 0
    }
}

let loop_fns = () => {
    move(fst,scnd)
    if(fst.style.left.slice(0,-2) < 0)
    {
        fst.style.left = `5px`
        fst.velocity.x += -fst.velocity.x + fst.velocity.x*(-.8)
    }
    if(fst.style.left.slice(0,-2) > window.innerWidth - 52)
    {
        fst.style.left = window.innerWidth - 52 + 'px';
        fst.velocity.x += -fst.velocity.x + fst.velocity.x*(-.8)
    }
    if(fst.style.top.slice(0,-2) < 0)
    {
        fst.style.top = `5px`
        fst.velocity.y += -fst.velocity.y + fst.velocity.y*(-.8)
    }
    if(fst.style.top.slice(0,-2) > window.innerHeight - 52)
    {
        fst.style.top = window.innerHeight - 52 + 'px';
        fst.velocity.y += -fst.velocity.y + fst.velocity.y*(-.8)
    }

    xx.style.width = fst.velocity.x < 0 ? Math.abs(fst.velocity.x) * 9 + "px" : fst.velocity.x * 9 + 'px'
    xx.style.left = fst.velocity.x < 0 ? fst.velocity.x * 9 + 2 + "px" : fst.velocity.x + 2 + 'px'

    yy.style.height = fst.velocity.y < 0 ? Math.abs(fst.velocity.y) * 9 + "px" : fst.velocity.y * 9 + 'px'
    yy.style.top = fst.velocity.y < 0 ? fst.velocity.y * 9 + "px" : fst.velocity.y + 5 + 'px'

    
}
let loop = setInterval(() => {
   loop_fns()
   drawing()
}, 20 )

document.addEventListener("keydown", (e) => {
    if(e.key == 'q' || e.key == 'й') clearInterval(loop)
    if(e.key == 'a' || e.key == 'ф') fst.velocity.x -= 1
    if(e.key == 'd' || e.key == 'в') fst.velocity.x += 1
    if(e.key == 'w' || e.key == 'ц') fst.velocity.y -= 1
    if(e.key == 's' || e.key == 'ы') fst.velocity.y += 1

    if(e.key == 'k' || e.key == 'л') fst.velocity.x -= 4
    if(e.key == ';' || e.key == 'ж') fst.velocity.x += 4
    if(e.key == 'o' || e.key == 'щ') fst.velocity.y -= 4
    if(e.key == 'l' || e.key == 'д') fst.velocity.y += 4


    if(e.key == ' ') clearInterval(loop)
    // if(e.key == 'c')
    // {
    //     var loop = setInterval(() => {
    //        loop_fns()
    //     }, 50 )
    // }
    console.log(e.key)
});