// eslint-disable-next-line react/prop-types
const BannerImg = ({hero, hero_mobile}) => {
  return (
      <div className="relative">
          <img src={hero} alt="Person holding a dog" className="hidden xl:block w-full lg:max-w-7xl "/>
          <img src={hero_mobile} alt="Person holding a dog" className="hidden max-xl:block w-full md:max-w-7xl "/>
      </div>
  );
};
export default BannerImg;