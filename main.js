'use strict';

// Make navbar blur
const navbar = document.querySelector('#navbar')
const navbarHeight = navbar.getBoundingClientRect().height

document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--dark')
  } else {
    navbar.classList.remove('navbar--dark')
  }
})


// home opacity
const home__height = document.querySelector('.home__container')
const homeHeight = home__height.getBoundingClientRect().height
document.addEventListener('scroll', ()=> {
  home__height.style.opacity = 1 - window.scrollY / homeHeight;
})

// arrow button

const button__arrow = document.querySelector('.arrow__up')

button__arrow.addEventListener('click', () => { 
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
})

document.addEventListener('scroll', () => {
  if(window.scrollY > navbarHeight){
    button__arrow.classList.add('--display')
  } else {
    button__arrow.classList.remove('--display')
  }
})

// Projects
const workBtnContainer = document.querySelector('.work__categories')
const projectContainer = document.querySelector('.work__projects')
const projects = document.querySelectorAll('.project')

workBtnContainer.addEventListener('click', (e)=> {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter
  projectContainer.classList.add('anim-out')
  
  const active = document.querySelector('.category__btn.selected')
  active.classList.remove('selected')

  e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode
  e.target.classList.add('selected')

  setTimeout(() => {
    for (let project of projects){
      if(filter === "*" || filter === project.dataset.type){
        project.classList.remove('invisible')
      } else {
        project.classList.add('invisible')
      }
    }
    projectContainer.classList.remove('anim-out')
  }, 300)
})  

// Toggle button 

const toggle = document.querySelector('.navbar__toggle-btn')
const nav__menu = document.querySelector('.navbar__menu')

toggle.addEventListener('click', () => {
  nav__menu.classList.toggle('open')
})

// scroll bar

const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  console.log(link)
  navbarMenu.classList.remove('open');
  const scrollTo = document.querySelector(link)
  scrollTo.scrollIntoView({behavior: 'smooth'})
});

const contactBtn = document.querySelector('.scroll__contact--home')
const contactMe = document.querySelector('#contact')

contactBtn.addEventListener('click' , () => {
  contactMe.scrollIntoView({behavior: 'smooth'})
})

// navbar borer active

const sectionIds = ['#home','#about','#skills','#work','#testimonials','#contact' ]

const sections = sectionIds.map(id => document.querySelector(id))
const navItems = sectionIds.map(id => document.querySelector(`[data-link ='${id}']`))

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.7
}

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      let sectionIndex = sections.indexOf(entry.target)
      let sectionMinus = sectionIndex - 1
      let sectionPlus = sectionIndex + 1

      navItems[sectionIndex].classList.add('active')
      if(sectionIndex === 0){
        if(navItems[sectionPlus].matches('.active')){
          navItems[sectionPlus].classList.remove('active')
        }
      }
      else if(sectionIndex >= 0 && 4 >= sectionIndex){
        navItems[sectionMinus].classList.remove('active')
        if(navItems[sectionPlus].matches('.active')){
          navItems[sectionPlus].classList.remove('active')
          navItems[sectionIndex].classList.add('active')
        }
      }
      else if (sectionIndex === 5){
        navItems[sectionMinus].classList.remove('active')
        navItems[sectionIndex].classList.add('active')
      }}
})}

const observer = new IntersectionObserver(callback, observerOptions)
sections.forEach(section => observer.observe(section))

