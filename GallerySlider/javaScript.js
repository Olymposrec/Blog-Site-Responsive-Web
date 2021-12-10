var models =[

    {
        name: 'Meadow',
        image: 'img/1.jpg',
        link: 'https://mocah.org/nature/page/6/',
        descb: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt cumque doloremque recusandae.'
    },
    {
        name: 'Japan',
        image: 'img/2.jpg',
        link:'https://wallpaperaccess.com/best-japan#google_vignette',
        descb: 'Lorem ipsum dolor sit amet consectetur.Nesciunt cumque doloremque recusandae.'
    },
    {
        name: 'Japan Forest',
        image: 'img/3.jpg',
        link:'https://wallpaperaccess.com/best-japan#google_vignette',
        descb: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur corporis nesciunt quidem soluta dignissimos vitae!'
    },
    {
        name: 'Autumn',
        image: 'img/4.jpg',
        link:'https://tr.pinterest.com/pin/442197257170677810/',
        descb: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
    },
    {
        name: 'Seaside',
        image: 'img/5.jpg',
        link:'https://www.narmao.ro/vali.stefan/',
        descb:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium, sapiente.'
    },
];

var index =0;
var slaytCount = models.length;
var interval;
var settings={
    duration:'3000',
    random:true
};

setSettings(settings);

showSlider(index);


document.querySelector('.fa-chevron-left').addEventListener('click',function(){
    index--;
    showSlider(index);
});
document.querySelector('.fa-chevron-right').addEventListener('click',function(){
    index++;
    showSlider(index);
});

document.querySelectorAll('.fas').forEach(function(item){
    item.addEventListener('mouseenter',function(){
        clearInterval(interval);
    });
});
document.querySelectorAll('.fas').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        setSettings(settings);
    });
});

function setSettings(settings){
    var createdNumb;
    interval=setInterval(function(){

        if(settings.random){
            do{
                index = Math.floor(Math.random() * slaytCount)
            }while(index == createdNumb)
            createdNumb=index;
        }else{
            if(slaytCount == index+1){
                index = -1;
            }
            showSlider(index);
            index++;
        }
        showSlider(index);

    },settings.duration);

}

function showSlider(i){
    index = i;

    if(i<0){
        index = slaytCount - 1;
    }
    if(i>slaytCount){
        index = 0;
    }

    document.querySelector('.card-title').textContent=models[index].name;
    document.querySelector('.card-img-top').setAttribute('src',models[index].image);
    document.querySelector('.card-link').setAttribute('href',models[index].link);
    document.querySelector('.card-text').textContent=models[index].descb;
    document.querySelector('.img-link').setAttribute('href',models[index].image);
}