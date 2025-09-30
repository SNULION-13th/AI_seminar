import "./DesignerPortfolio.css";
import image6 from "./assets/images/image-6-691b53.png";
import image8 from "./assets/images/image-8.png";
import image9 from "./assets/images/image-9-7fa843.png";
import rectangle30 from "./assets/images/rectangle-30.svg";
import rectangle40 from "./assets/images/rectangle-40.svg";
import arrowVector from "./assets/images/arrow-vector.svg";

function DesignerPortfolio() {
  return (
    <div className="bg-black text-white min-h-screen font-sans overflow-x-hidden">
      <div className="relative w-[393px] h-[1129px] mx-auto">
        {/* Header */}
        <div className="absolute top-[100px] left-[10px] flex flex-col gap-0.5">
          <div className="px-2.5 flex justify-center items-center">
            <p className="text-2xl font-urbanist">Designer.</p>
          </div>
          <div className="px-2.5 flex justify-center items-center">
            <p className="text-xl font-kaisei-opti">박서윤</p>
          </div>
        </div>

        {/* Back Arrow */}
        <div className="absolute top-[54px] left-[19px] w-3 h-6">
          <img
            src={arrowVector}
            alt="Back"
            className="absolute top-[5.52px] left-[2.41px] w-[7.13px] h-[12.97px]"
          />
        </div>

        {/* Images */}
        <img
          src={image6}
          alt="Fashion"
          className="absolute top-[267px] left-0 w-[310px] h-[628px] opacity-50"
        />
        <img
          src={image8}
          alt="Background"
          className="absolute top-[1784px] left-[-426px] w-[852px] h-[852px]"
        />

        {/* Grey Rectangles as placeholders */}
        <img
          src={rectangle30}
          alt="placeholder"
          className="absolute top-[89px] left-[250px] w-[120px] h-[160px]"
        />
        <img
          src={rectangle40}
          alt="placeholder"
          className="absolute top-[180px] left-[141px] w-[92px] h-[69px]"
        />
        <div className="absolute bg-[#C4C4C4] top-[267px] left-[250px] w-[94px] h-[53px]"></div>
        <div className="absolute bg-[#D9D9D9] top-[267px] left-[127px] w-[106px] h-[106px]"></div>

        {/* Text Content */}
        <div className="absolute top-[459px] left-[31px] text-[10px] font-kaisei-opti leading-loose tracking-tighter w-[329px] h-[492px]">
          <p>
            Shards of Serenity
            <br />
            (고요의 파편)
          </p>
          <br />
          <p>⸻</p>
          <br />
          <p>
            흩어진 조각 속에서 다시 피어나는 질서와 고요, 전통과 혁신의 여백을
            잇다.
          </p>
          <br />
          <p>⸻</p>
          <br />
          <p>
            이 컬렉션은 한국의 자개, 노리개, 청자를 현대적 감각으로 재구성한
            실험이다.
            <br />
            청자의 곡선은 마치 깨진 파편처럼 해체되었지만, 그 안에는 여전히
            고고한 기품이 흐른다.
            <br />
            자개의 은은한 빛과 노리개의 상징적 매듭은, 전통이 지닌 정교함과
            서사를 현대의 언어로 번역한다.
          </p>
          <br />
          <p>
            테크웨어 특유의 구조적 실루엣과 기능적 디테일이 더해져, 버클은
            단순한 여밈이 아니라 ‘조각과 조각을 이어주는 매개’로 작동한다.
            <br />
            이는 흩어진 과거의 형상들이 새로운 질서 속에서 결합하여, 과거와
            현재, 장식과 기능이 한 몸처럼 숨 쉬는 순간을 시각화한다.
          </p>
          <br />
          <p>
            이 옷들은 전통을 부수는 것이 아니라, 그 조각들을 다시 엮어 오늘의 몸
            위에 입히는 방식으로 혁신을 실현한다.
            <br />
            부서진 파편은 끝이 아니라, 또 다른 시작의 형상이다.
          </p>
        </div>

        {/* Footer Text */}
        <div className="absolute top-[951px] left-[73px] text-[#7E7E7E]">
          <p className="text-2xl font-bold font-urbanist">
            Tradition & Revolution
          </p>
        </div>
        <div className="absolute top-[986px] left-[87px] text-[#7E7E7E] text-center text-[8px] font-kaisei-opti w-[216px] h-[43px]">
          <p>♦ 전통과 혁신, 기억을 넘어 미래로 잇다.</p>
        </div>
      </div>
    </div>
  );
}

export default DesignerPortfolio;
