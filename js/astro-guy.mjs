const html =  /* html */`
  <span class="bag"></span>
  <span class="myhead"></span>
  <span class="mybody"></span>
  <span class="hands mylhand"></span>
  <span class="hands myrhand"></span>
  <span class="legs mylleg"></span>
  <span class="legs myrleg"></span>
  <span class="laptop laptop-bottom"></span>
  <span class="laptop laptop-screen"></span>
`;

const css = /* css */`
astro-guy{
  position: absolute;
  top:330px;left:60px;
}

astro-guy > span{
  display:inline-block;
  position:absolute;
  background-color:#ddd;
  box-sizing: border-box;
}
astro-guy > span.bag{
  height:50px;
  width:37px;
  top:14px;
  left:-5px;
  background-color:#aaa;
  border-radius:5px;
}
astro-guy > span:not(.mybody){
  box-shadow:         3px 10px 16px #000; 
}
astro-guy > span.myhead{
  height:30px;
  width:25px;
  border-radius:100%;
  border-top:5px solid #ddd;
  border-bottom:5px solid #ddd;
  background-color:#1c1e30;
  box-sizing: border-box;
}

astro-guy > span.mybody{
  top:30px;
  left:2px;
  height:35px;
  width:23px;
  border:6px solid #ccc;
  z-index:1;
  border-radius:5px;
}

astro-guy > span.hands{
  height:34px;
  width:7px;
  border-radius:5px 5px 100% 100%;
  border:2px solid #aaa;
  left:-1px;
  top:33px;
  transform-origin: top center;
  transform: rotate(10deg);
}

astro-guy > span.mylhand{
  transform:rotate(-10deg);
  left:21px;
}

astro-guy > span.legs{
  height:30px;
  width:10px;
  left:3px;
  top:65px;
  transform-origin: top center;
  transform: rotate(10deg);
  border:3px solid #aaa;
  border-radius:0px 0px 5px 5px;
}

astro-guy > span.myrleg{
  transform:rotate(-10deg);
  left:15px;
}

/* Casual Me :3 */
astro-guy.casual > span{
  background-color:#f0caad;
}

astro-guy.casual > span.mybody{
  background-color:#09f;
  border:none;
}

astro-guy.casual > span.hands{
  border:none;
  border-top:15px solid #07a;
}

astro-guy.casual > span.myhead{
  border:none;
  border-top:14px solid #1c1c1c;
}
astro-guy.casual > span.legs{
  border:1px solid #2c3e50;
  background-color:#fff;
  border-radius:0px 0px 3px 3px;
  border-top:25px solid #2c3e50;
}
astro-guy.casual > span.bag{
  display:none;
}
astro-guy:not(.casual) > span.laptop{
  display:none;
}


#projects astro-guy{
  top:-76px !important;
  left:unset !important;
  right:60px !important;
  z-index:2;
}

#projects astro-guy > span.myrhand{
  left:5px;
  z-index:3;
  transform:rotate(-40deg);
}

#projects astro-guy > span.mylhand{
  transform:rotate(-40deg);
  left:10px;
}


#projects astro-guy > span.legs{
  width:13px;
  height:35px;
  top:70px;
  border-radius:10px 0px 0px 10px;
}
#projects astro-guy > span.mybody{
  border-radius:5px 15px 0px 0px;
}
#projects astro-guy > span.mylleg{
  transform:rotate(270deg) translateY(-7px);
}

#projects astro-guy > span.myrleg{
  transform:rotate(270deg) translateY(0px);
}

#projects astro-guy > span.myhead{
  border-left:10px solid #1c1c1c;
}

#projects astro-guy > span.laptop-bottom{
  height:4px;
  width:30px;
  background-color:#ddd;
  top:60px;
  left:30px;
}

#projects astro-guy > span.laptop-screen{
  height:4px;
  width:30px;
  background-color:#ddd;
  top:48px;
  border-radius:5px;
  left:50px;
  transform:rotate(-60deg);
  box-shadow:         0px -10px 16px #09f;
}


/* My moves ^_^ */
astro-guy.hover-wave.waving > span.mylhand{
  will-change: transform;
  animation:astro-guy-waving-lhand 2s;
  left:23px;
}

#projects astro-guy.typing > span.mylhand{
  animation: typeleft .1s ease-in-out infinite;
}

#projects astro-guy.typing > span.myrhand{
  animation: typeleft .2s ease-in-out infinite;
}

#aboutme astro-guy.spread > span.mylhand{
  transform: rotate(10deg);
  animation: spreadleft 1.5s ease infinite;
  z-index:1;
}

#aboutme astro-guy.spread > span.myrhand{
  transform: rotate(-10deg);
  animation: spreadright 1.5s ease infinite;
  z-index:1;
}

#aboutme astro-guy.spread > span.laptop{
  display:inline-block;
}

#aboutme astro-guy.spread > span.laptop-bottom{
  height:unset;
  width:300px;
  box-shadow:none;
  background-color:transparent;
  display:inline-block;
  top:0px;
  z-index:2;
  left:-25px;
  right:0;
  margin:auto;
  animation:spread-container 1.5s ease infinite;
}



#aboutme astro-guy.spread > span.laptop-bottom > i{
  padding:0px 0px;
  animation:spread 1.5s ease infinite;
}

@keyframes astro-guy-waving-lhand {
  0%   { transform:rotate(-10deg)}
  20% {transform:rotate(-140deg)}
  30%   { transform:rotate(-100deg)}
  40%   { transform:rotate(-140deg)}
  50%   { transform:rotate(-100deg)}
  60%   { transform:rotate(-140deg)}
  70%   { transform:rotate(-100deg)}
  80%   { transform:rotate(-140deg)}
  100%   { transform:rotate(-10deg)}
}

@keyframes typeleft {
  0% {transform: rotate(-40deg);}
  60% {transform: rotate(-45deg);}
  100% {transform: rotate(-40deg);}
}

@keyframes spreadleft{
  0% {transform:rotate(0deg);height:10px}
  90% {transform: rotate(240deg);height:34px;}
  100% {transform: rotate(100deg);height:10px}
}

@keyframes spreadright{
  0% {transform:rotate(0deg);height:10px;}
  90% {transform: rotate(-240deg);height:34px;}
  100% {transform: rotate(-100deg);height:10px;}
}

@keyframes spread-container{
  0% {top:30px;opacity:0;left:-30px}
  80%{opacity:1;left:-40px}
  90%{left:-40px;}
  100%{top:-30px;opacity:0;left:-40px;}
}

@keyframes spread{
  0%{padding:0px 0px;}
  80%{padding:0px 5px;}
  100%{padding:0px 5px;}
}
`;

class AstroGuy extends HTMLElement{
  constructor(){
    super();
    this.spreader;
    this.spreadingLove = false;
  }

  spreadStart(){
    document.querySelector('.destruction-msg').innerHTML = 'spread lub <3';
    let positivity = ['💕', '🌻', '🦄', '🌈', '👼', '✨', '🎉'];
    this.spreader = () => {
      if(this.classList.contains('spread')){
        document.querySelector('astro-guy.spread > span.laptop-bottom').innerHTML = `<i>${positivity[Math.floor(Math.random()*positivity.length)]}</i> <i>${positivity[Math.floor(Math.random()*positivity.length)]}</i> <i>${positivity[Math.floor(Math.random()*positivity.length)]}</i>`;
      }
    }
    
    setInterval(this.spreader,1500);
    this.spreader();
  }

  spreadStop(){
    clearInterval(this.spreader);
  }

  connectedCallback(){

    if(this.classList.contains('spreader')){
      const spreadingHandler = () => {
        this.classList.add('spread');
        this.spreadStart();
        this.removeEventListener('mouseover',spreadingHandler, true);

      }

      this.addEventListener('mouseover', spreadingHandler, true);
    }
    
    if(this.classList.contains('typer')){
      this.addEventListener('mouseover', () => this.classList.add('typing'));
      this.addEventListener('mouseout', () => this.classList.remove('typing'));
    }else{
      this.addEventListener('mouseover', () => this.classList.add('waving'));
      this.addEventListener('touchend', () => this.classList.add('waving'));
      this.addEventListener('mouseout', () => this.classList.remove('waving'));
      this.addEventListener('animationend', e => {
        if(e.animationName === 'astro-guy-waving-lhand') {
          this.classList.remove('waving');
        }
      })
    }

    this.innerHTML = html;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
}

export default AstroGuy;