/**
 * 노드에 속한 이미지를 옵저버를 통해 지연 로딩
 * 지연 로딩을 적용하려면 img element 속성의 data-src에 이미지 경로를 입력.
 *
 * @param target
 */
function imageLazyload(target) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // 스크린에서 타겟을 발견 한 경우
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute("data-src");

        // data-src 속성의 값을 src 속성으로 옮김
        img.setAttribute("src", src);

        observer.disconnect();
      }
    });
  });

  imageObserver.observe(target);
}

const imageElems = document.querySelectorAll(".lazy-load img");
imageElems.forEach(imageLazyload);
