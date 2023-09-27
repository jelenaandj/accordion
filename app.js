let api = 'http://localhost:3000/data';
class Accordion{
    constructor(id,url){
        this.wrapper =  document.querySelector(`${id}`),
        this.url = url
    }

    makeElements(data){
                let ctx = document.createElement('div');
                ctx.setAttribute('class','ctx');
                ctx.style.margin='20px'

                this.wrapper.appendChild(ctx);
                data.forEach(element => {

                //make heading
                let heading = document.createElement('div');
                heading.setAttribute('class','heading');
                heading.textContent = element.heading;
                ctx.appendChild(heading);

                //make arrow icon
                let arrow = document.createElement('img');
                arrow.src = "./assets/expandMore.svg";
                arrow.setAttribute('class','arrow');
                heading.appendChild(arrow);
                //make contentWrapper
                let contentWrapper =  document.createElement('div');
                contentWrapper.setAttribute('class','contentWrapper');

                ctx.appendChild(contentWrapper);


                //make content
                let content =  document.createElement('div');
                contentWrapper.appendChild(content);

                heading.addEventListener('click',function(e){
                content.setAttribute('class','content');
                content.innerText = element.content;

                arrow.style.transform = 'rotate(180deg)'


                if(contentWrapper.style.maxHeight){
                        // console.log(contentWrapper.nextElementSibling,'contentwrapper sibl');
                        contentWrapper.style.maxHeight = null
                        arrow.style.transform = 'rotate(0deg)'


                    }else{
                        // console.log(contentWrapper.nextElementSibling,'contentwrapper sibl');

                        contentWrapper.style.maxHeight = content.scrollHeight + 'px';
                        arrow.style.transform = 'rotate(180deg)'
                    }
                    ctx.querySelectorAll('.heading').forEach((element,index)=>{
                        // console.log(element.nextElementSibling,index,'index');
                        if (element !== e.target) {
                        console.log(element.nextElementSibling,index,'sibl');
                        element.nextElementSibling.style.maxHeight = null;
                        element.firstElementChild.style.transform = 'rotate(0deg)'
                    }
                    })
                    })
                })
        }

    init(){
    this.data = fetch(`${this.url}`)
        .then(data=>data.json())
        .then(data=>{
            this.makeElements(data)
        }
        )
    }

}

let accordion = new Accordion('.acc-wrapper',api)

accordion.init();
