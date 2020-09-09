function lazyload(target) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // 스크린에서 타겟을 발견 한 경우
      // data-src의 값을 src로 옮김
      // 완료되면 옵저버 연결 해제
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");
        img.setAttribute("src", src);

        observer.disconnect();
      }
    });
  });

  imageObserver.observe(target);
}

const imageElems = document.querySelectorAll(".lazy-load img");
imageElems.forEach(lazyload);
