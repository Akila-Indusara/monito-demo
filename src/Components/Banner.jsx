// eslint-disable-next-line react/prop-types
const Banner = ({ children,
                    // eslint-disable-next-line react/prop-types
                    bg_style = "bg-gradient-to-br from-[#FCEED5] to-[#FFE7BA] w-full xl:pr-8 rounded-b-[40px]",
                    // eslint-disable-next-line react/prop-types
                    style = "bg-hero-pattern-mobile lg:bg-hero-pattern bg-cover flex flex-col lg:flex-row items-center " +
                    "justify-between px-16 max-xl:px-10 xl:mx-auto" }) => {
    return (
        <section className= { bg_style }>

            <div className={ style }>

                { children }

            </div>
        </section>
    );
};
export default Banner;