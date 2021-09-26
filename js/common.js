'use strict'

const fadeIn = (el, timeout, display) => {
	el.style.opacity = 0
	el.style.display = display || 'block';
	el.style.transition = `opacity ${timeout}ms`
	setTimeout(() => {
		el.style.opacity = 1
	}, 10)
}
const fadeOut = (el, timeout) => {
	el.style.opacity = 1
	el.style.transition = `opacity ${timeout}ms`
	el.style.opacity = 0

	setTimeout(() => {
		el.style.display = 'none'
	}, timeout)
}

const header = () => {

    const header_bottom = document.querySelector('.header__bottom')

	if (header_bottom) {
		 const swiper = new Swiper(header_bottom.querySelector('.swiper'), {
		 	loop: true,
		 	spaceBetween: 10,

		 	pagination: {
		 		el: header_bottom.querySelector('.swiper_control__bullet'),
		 		clickable: true
		 	},

		 	navigation: {
		 		nextEl: header_bottom.querySelector('.swiper_control__right'),
		 		prevEl: header_bottom.querySelector('.swiper_control__left')
		 	}
		 })
	}

   

    const header_burger_btn = document.querySelector('.header .burger')
    const burger_modal = document.getElementById('burger_modal')

    header_burger_btn.addEventListener('click', function(event) {
        event.preventDefault()

		document.querySelector('html').classList.add('overflow-hidden')
        burger_modal.classList.add('active')
		
    })

}

const close_modal = () => {
	 const modal_close_button = document.querySelectorAll('.js--modal-close')

	 modal_close_button.forEach(e => {
	 	e.addEventListener('click', function (event) {
	 		event.preventDefault()

	 		this.closest('.js--modal').classList.remove('active')

			if (this.closest('.modal_review')) {
				
				this.closest('.modal_review').classList.add('modal_review_remove')

				setTimeout(() => {
					this.closest('.modal_review').remove()
				}, 500);
			}

			if (this.closest('.modal_new')) {
				this.closest('.modal_new').classList.add('modal_new_remove')

				setTimeout(() => {
					this.closest('.modal_new').remove()
				}, 500);
				
			}

			if (document.querySelector('html').classList.contains('overflow-hidden')) document.querySelector('html').classList.remove('overflow-hidden')
	 	})
	 })
}

const section_search_game = () => {
    const show_list_button = document.querySelector('.list_show')
    const list_toggle = document.querySelector('.list_toggle')

    if (show_list_button) {
        show_list_button.addEventListener('click', function(event) {
            event.preventDefault()
            this.remove()
            list_toggle.classList.add('show')


        })
    }
}

const create_modal_review = () => {

	const create_button = document.querySelectorAll('.js--review-modal-create')

	create_button.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault()

			const parent = this.closest('.review_item')
			const image = parent.querySelector('.review_item__image img').getAttribute('src')
			const author = parent.querySelector('.review_item__right .left').innerHTML
			const date = parent.querySelector('.review_item__right .right').innerHTML
			const text = parent.querySelector('.js--text-buffer').innerHTML

			document.querySelector('html').classList.add('overflow-hidden')

			document.body.insertAdjacentHTML('beforeend', `<div class="modal_review js--modal">
				<div class="modal_review__wrap">
					<button class="modal_review__close js--modal-close" type="button"><svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
			<line x1="26.3998" y1="1.0424" x2="1.53148" y2="25.9107" stroke="#B2B1BE" stroke-width="1.1723"/>
			<line x1="25.5709" y1="25.9108" x2="0.70254" y2="1.04247" stroke="#B2B1BE" stroke-width="1.1723"/>
			</svg>
					</button>
					<div class="modal_review__header">
					<div class="modal_review__header_image"><img src="${image}" alt="image"></div>
					<div class="modal_review__header_text">
						<div class="title">${author}</div>
						<div class="date">${date}</div>
					</div>
					</div>
					<div class="modal_review__text">
					<p>${text}</p>
					</div>
				</div>
				</div>`)
			
			document.querySelector('.modal_review').classList.add('active')
			close_modal()
		})
	})
}

const create_modal_new = () => {
	const create_button = document.querySelectorAll('.js--new-modal-create')

	create_button.forEach(e => {
		e.addEventListener('click', function (event) {
			event.preventDefault()

			const parent = this.closest('.new_item')
			const image = parent.querySelector('.new_item__image').getAttribute('data-image-full')
			const title = parent.querySelector('.new_item__title').innerHTML
			const date = parent.querySelector('.new_item__time span').innerHTML
			const text = parent.querySelector('.js--text-buffer')
			
			const text_count = text.querySelectorAll('p').length

			let suffle = ''

			if (text_count > 1) suffle = 'suffle'

			document.querySelector('html').classList.add('overflow-hidden')

			document.body.insertAdjacentHTML('beforeend', `<div class="modal_new js--modal">
				<div class="container">
					<div class="modal_new__wrap">
					<div class="modal_new__wrap_header" style="background-image: url(${image})">
						<button class="modal_new__close js--modal-close close" data-dismiss="modal" aria-label="Close" type="button"><svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
			<line x1="2.06066" y1="1.5957" x2="40.9999" y2="40.535" stroke="#E0DEF4" stroke-width="1.5" stroke-linecap="round"/>
			<line x1="1" y1="40.535" x2="39.9393" y2="1.59578" stroke="#E0DEF4" stroke-width="1.5" stroke-linecap="round"/>
			</svg>
						</button>
						<div class="title">${title}</div>
						<div class="date"><i class="icon"><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10.1453 0.230469C4.62527 0.230469 0.155273 4.71047 0.155273 10.2305C0.155273 15.7505 4.62527 20.2305 10.1453 20.2305C15.6753 20.2305 20.1553 15.7505 20.1553 10.2305C20.1553 4.71047 15.6753 0.230469 10.1453 0.230469ZM10.1553 18.2305C5.73527 18.2305 2.15527 14.6505 2.15527 10.2305C2.15527 5.81047 5.73527 2.23047 10.1553 2.23047C14.5753 2.23047 18.1553 5.81047 18.1553 10.2305C18.1553 14.6505 14.5753 18.2305 10.1553 18.2305ZM9.93527 5.23047H9.87527C9.47527 5.23047 9.15527 5.55047 9.15527 5.95047V10.6705C9.15527 11.0205 9.33527 11.3505 9.64527 11.5305L13.7953 14.0205C14.1353 14.2205 14.5753 14.1205 14.7753 13.7805C14.9853 13.4405 14.8753 12.9905 14.5253 12.7905L10.6553 10.4905V5.95047C10.6553 5.55047 10.3353 5.23047 9.93527 5.23047Z" fill="#B2B1BE"/>
			</svg></i><span>${date}</span></div>
					</div>
					<div class="modal_new__wrap_content ${suffle}">${text.innerHTML}</div>
					</div>
				</div>`)
			
			document.querySelector('.modal_new').classList.add('active')
			

			close_modal()
		})
	})
}

const modal_profile = () => {
	const modal_profie = document.querySelectorAll('.modal_profie')


}

const auth_modal = () => {
	const auth_tab_button = document.querySelectorAll('.modal_profie__tab button')
	const auth_tab_wrap = document.querySelectorAll('.modal_profie__wrap_tb')
	const modal_profie = document.querySelector('#modal_auth')

	const auth_login_active = document.querySelectorAll('.js--auth-login-active')
	const auth_register_active = document.querySelectorAll('.js--auth-register-active')

	auth_login_active.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault()
			event.stopPropagation()
			document.querySelector('html').classList.add('overflow-hidden')
			modal_profie.classList.add('active')

			auth_tab_button[0].classList.add('active')
			auth_tab_button[1].classList.remove('active')

			auth_tab_wrap[0].classList.add('active')
			auth_tab_wrap[1].classList.remove('active')
		})
	})

	auth_register_active.forEach(e => {
		e.addEventListener('click', function(event) {
			event.preventDefault()
			event.stopPropagation()
			document.querySelector('html').classList.add('overflow-hidden')
			modal_profie.classList.add('active')

			auth_tab_button[0].classList.remove('active')
			auth_tab_button[1].classList.add('active')

			auth_tab_wrap[0].classList.remove('active')
			auth_tab_wrap[1].classList.add('active')
		})
	})

	document.addEventListener('click', function (event) {
		const target = event.target
		const its_menu = target == modal_profie.querySelector('.modal_profie__wrap') || modal_profie.querySelector('.modal_profie__wrap').contains(target)
		const its_btn_login = target == auth_login_active
		const its_btn_register = target == auth_register_active
		const menu_is_active = modal_profie.classList.contains('active')

		if (!its_menu && !its_btn_login && menu_is_active) {
			modal_profie.classList.remove('active')
			
			if (document.querySelector('html').classList.contains('overflow-hidden')) document.querySelector('html').classList.remove('overflow-hidden')
		}

		if (!its_menu && !its_btn_register && menu_is_active) {
			modal_profie.classList.remove('active')
			
			if (document.querySelector('html').classList.contains('overflow-hidden')) document.querySelector('html').classList.remove('overflow-hidden')
		}
	})

	if (auth_tab_button) {
		auth_tab_button.forEach((e,i) => {
			e.addEventListener('click', function(event) {
				event.preventDefault()

				for (let item of e.parentNode.children) {
					item.classList.remove('active')
				}

				e.classList.add('active')

				for (let item of auth_tab_wrap[i].parentNode.children) {
					item.classList.remove('active')
				}

				auth_tab_wrap[i].classList.add('active')
			})
		})
	}
}

const section_news = () => {
    const news_wrap = document.querySelector('.section_news')

	if (news_wrap) {
		const swiper = new Swiper(news_wrap.querySelector('.swiper'), {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 20,


			pagination: {
				el: news_wrap.querySelector('.swiper_control__bullet'),
				clickable: true,
				dynamicBullets: true,
				// dynamicMainBullets: 1,
			},

			navigation: {
				nextEl: news_wrap.querySelector('.swiper_control__right'),
				prevEl: news_wrap.querySelector('.swiper_control__left')
			},

			on: {
				init: function () {
					news_wrap.querySelector('.page_smart .first').innerHTML = this.realIndex + 1
					news_wrap.querySelector('.page_smart .last').innerHTML = this.slides.length - 4
				},

				activeIndexChange: function () {
					news_wrap.querySelector('.page_smart .first').innerHTML = this.realIndex + 1
				}
			},

			breakpoints: {
				'0': {
					slidesPerView: 1.1,
					spaceBetween: 25,
					centeredSlides: true,
					centeredSlidesBounds: true,
				},
				'768': {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				'1320': {
					slidesPerView: 3,
					slidesPerGroup: 3,
					centeredSlides: false,
					centeredSlidesBounds: false,
				}
			}
		})
	}

    
}

const section_reviews = () => {

    const reviews_wrap = document.querySelector('.section_reviews')

	if (reviews_wrap) {
		const swiper = new Swiper(reviews_wrap.querySelector('.swiper'), {

			loop: true,

			pagination: {
				el: reviews_wrap.querySelector('.swiper_control__bullet'),
				clickable: true,
				dynamicBullets: true,
				// dynamicMainBullets: 3,
			},

			navigation: {
				nextEl: reviews_wrap.querySelector('.swiper_control__right'),
				prevEl: reviews_wrap.querySelector('.swiper_control__left')
			},

			on: {
				init: function () {
					reviews_wrap.querySelector('.page_smart .first').innerHTML = this.realIndex + 1
					reviews_wrap.querySelector('.page_smart .last').innerHTML = this.slides.length - 2
				},

				activeIndexChange: function () {
					reviews_wrap.querySelector('.page_smart .first').innerHTML = this.realIndex + 1
				}
			},

			breakpoints: {
				'0': {
					slidesPerView: 1,
					spaceBetween: 5,
				},
				'768': {
					slidesPerView: 1.8,
					spaceBetween: 50,
					centeredSlides: true,
					centeredSlidesBounds: true,
				},
				'1050': {
					slidesPerView: 2,
					spaceBetween: 80,
				},
				'1440': {
					slidesPerView: 3,
					spaceBetween: 80,
				}
			}
		})
	}

    
}

const selected = () => {
	const select_custom = document.querySelectorAll('.custom_select')

	if (select_custom) {
		select_custom.forEach(e => {
			new SlimSelect({
				select: e,
				showSearch: false,
			})
		})
	}
}

header()
section_search_game()
section_news()
section_reviews()


create_modal_review()
create_modal_new()
auth_modal()
close_modal()

selected()