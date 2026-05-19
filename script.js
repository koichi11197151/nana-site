document.addEventListener('DOMContentLoaded', () => {
  // HTMLのID名に合わせて要素を取得
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');
  const navLinks = document.querySelectorAll('#js-nav a');

  // 1. ハンバーガーボタンをクリックしたときの処理
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // 2. メニュー内のリンクをクリックしたときにメニューを自動で閉じる処理
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    });
  });
});

const header = document.getElementById("header");
const hero = document.querySelector(".hero");
const pageTop = document.getElementById("pageTop"); // ★新しく追加

window.addEventListener("scroll", () => {
  const heroHeight = hero.offsetHeight;

  // --- ヘッダーの制御（元々あったやつ） ---
  if(window.scrollY > heroHeight - 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // --- TOPボタンの制御（新しく合流！） ---
  if (window.scrollY > heroHeight) {
    pageTop.classList.add("show");    // ファーストビューを超えたらふわっと出す
  } else {
    pageTop.classList.remove("show"); // ファーストビューに戻ったらふわっと消す
  }
});

// モーダルウィンドウ

// すべての画像リンク（クラス名）を取得
const links = document.querySelectorAll('.gallery-link, .favorite-link');

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

// すべての画像リンクに対してクリックイベントを設定
links.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // ページ遷移を止める
    
    // クリックされたaタグの href（画像のパス）を取得
    const imageSrc = this.getAttribute('href');
    
    // モーダル内の img タグに画像のパスをセット
    modalImg.src = imageSrc;
    
    // モーダルを表示
    modal.style.display = 'flex';
  });
});

// ×ボタンをクリックしたら閉じる
closeModal.addEventListener('click', function() {
  modal.style.display = 'none';
});

// 背景をクリックしたら閉じる
modal.addEventListener('click', function(e) {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Swiperの初期化
const swiper = new Swiper('.favorite-slider', {
  loop: true,              /* ループ再生（最後の画像の次は最初の画像に戻る） */
  speed: 1000,
  centeredSlides: true,    /* アクティブなスライドを中央に配置する */
  slidesPerView: 1.5,      /* 画面内に何枚画像を表示させるか（左右をはみ出させるために1.5〜2くらいに設定） */
  spaceBetween: 20,        /* 画像と画像の間のすき間（px） */

  autoplay: {
    delay: 3000,                  /* 次の画像に切り替わるまでの時間（3000 = 3秒） */
    disableOnInteraction: false,  /* ユーザーが手動でスワイプした後も自動再生を止めない設定 */
  },
  // レスポンシブ設定（スマホとPCで表示枚数を変える）
  breakpoints: {
    640: {
      slidesPerView: 2,    /* 画面幅640px以上のときは2枚っぽく見せる */
      spaceBetween: 30,
    }
  },

  // 左右のナビゲーション（矢印）
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // 下のドット（ページネーション）
  pagination: {
    el: '.swiper-pagination',
    clickable: true,       /* ドットをクリックしても動かせるようにする */
  },
});