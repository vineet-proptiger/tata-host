import { Check, BedDouble } from "lucide-react";

const F_SANS = "var(--font-sans), Open Sans, sans-serif";
const THEME_BLUE = "#000242";
const GOLD = "#c28522";

const units = [
  {
    type: "2 BHK",
    subtitle: "RESIDENCES",
    size: "On Request",
    price: "₹ 1.99 Cr*",
    btnText: "GET DETAILS",
    features: [
      "Unlock Pricing & Floor Plans",
      "Attractive Payment Plan",
      "47.5-Acre Landmark Development",
    ],
    isPopular: false,
  },
  /*
  {
    type: "3 BHK Type 1",
    subtitle: "RESIDENCES",
    size: "1450 Sq.Ft.",
    price: "Ask For Price",
    btnText: "GET DETAILS",
    features: [
      "Unlock Pricing & Floor Plans",
      "Attractive Payment Plan",
      "47.5-Acre Landmark Development",
    ],
    isPopular: true,
  },
  */
  {
    type: "3 BHK",
    subtitle: "RESIDENCES",
    size: "On Request",
    price: "Ask For Price",
    btnText: "GET DETAILS",
    features: [
      "Unlock Pricing & Floor Plans",
      "Attractive Payment Plan",
      "47.5-Acre Landmark Development",
    ],
    isPopular: false,
  }
];

const HexShape = ({ color }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 240 220" preserveAspectRatio="none">
    <path 
      d="M 70 218 L 20 170 L 20 50 L 70 2 L 170 2 L 220 50 L 220 170 L 170 218" 
      fill="white" 
      stroke={color} 
      strokeWidth="1.5" 
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

const Pricing = ({ setIsOpen }) => {
  return (
    <section
      id="pricing"
      className="py-16 sm:py-24 px-4 md:px-8 relative overflow-hidden bg-white"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="relative text-center mb-16 md:mb-20" data-aos="fade-up" data-aos-duration="1000"> 
          <h2
            className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-gray-900"
            style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif" }}
          >
            Configurations & Pricing
          </h2>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4 mb-3">
            <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
            <div className="w-2 h-2 rounded-full bg-[#7d9b93] mx-3"></div>
            <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-20 max-w-[760px] mx-auto justify-items-center">
          
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-[110px] left-[25%] right-[25%] h-[1px] bg-[#d5e0dd] -z-10"></div>
          {/* Dot on the line between the 2 cards */}
          <div className="hidden md:block absolute top-[106px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-[1.5px] border-[#125b4c] bg-white -z-10"></div>

          {units.map((unit, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={idx * 150}
              className="flex flex-col items-center relative"
            >
              {/* Hexagon Container */}
              <div className="relative w-[240px] h-[220px] flex flex-col items-center justify-center p-6 mb-8 bg-white shadow-[0_0_20px_rgba(0,0,0,0.02)]">
                <HexShape color={unit.isPopular ? GOLD : THEME_BLUE} />
                
                {unit.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#c28522] text-white text-[10px] font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-20 tracking-wider shadow-sm">
                    MOST PREFERRED
                  </div>
                )}

                {/* Icon */}
                <div className="mb-4 rounded-full bg-gray-50/50 w-12 h-12 flex items-center justify-center relative z-10 border border-gray-100">
                  <BedDouble size={24} color={unit.isPopular ? GOLD : THEME_BLUE} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-[20px] font-bold text-center leading-tight mb-2 relative z-10 text-gray-800 tracking-wide" style={{ fontFamily: F_SANS }}>
                  {unit.type} <br /> 
                  <span className="text-[14px] font-semibold">{unit.subtitle}</span>
                </h3>
                <p className="text-[11px] font-bold tracking-widest text-gray-500 relative z-10 uppercase mt-1" style={{ fontFamily: F_SANS }}>
                  SIZE: <span className="text-gray-700 capitalize font-medium">{unit.size}</span>
                </p>
              </div>

              {/* Price Section */}
              <div className="text-center mb-6 h-[70px] flex flex-col justify-end">
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1" style={{ fontFamily: F_SANS }}>Starting At</p>
                <p className={`text-[28px] font-bold ${unit.isPopular ? 'text-[#c28522]' : 'text-[#000242]'}`} style={{ fontFamily: F_SANS }}>
                  {unit.price}
                </p>
              </div>

              {/* Features */}
              <div className="flex flex-col gap-3.5 mb-8 w-full max-w-[220px]">
                {unit.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 text-[13px] text-gray-700 font-medium" style={{ fontFamily: F_SANS }}>
                    <div className="mt-0.5 flex-shrink-0">
                      <Check size={16} strokeWidth={3} color={unit.isPopular ? GOLD : THEME_BLUE} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button
                onClick={() => setIsOpen(true)}
                className={`w-full max-w-[220px] py-3.5 rounded-md text-[13px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg border-2
                  ${unit.isPopular 
                    ? 'bg-[#c28522] border-[#c28522] text-white hover:bg-[#a6711a]' 
                    : 'bg-[#000242] border-[#000242] text-white hover:bg-white hover:text-[#000242]'}`}
              >
                {unit.btnText}
              </button>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
