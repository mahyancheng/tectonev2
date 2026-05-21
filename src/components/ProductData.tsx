// New showcase portraits — pure black background + white frame + mesh detail.
// Replaces the original webp lifestyle photos with clean product cut-outs that
// match the Balenciaga × SpaceX dark aesthetic.
import SwingDoor from "../images/107-swing-door.jpg";
import FoldingDoor from "../images/104-folding-door.jpg";
import SlidingDoor from "../images/105-sliding-door.jpg";
import CasementWindow from "../images/103-casement-window.jpg";
import SlidingWindow from "../images/106-sliding-window.jpg";
import FixedScene from "../images/102-fixed-screen.jpg";
import TongHung from "../images/108-top-hung.jpg";



export const productDetails = [
    {
        id: "107-security-swing-door",
        title: "Insect Screen Swing Door",
        pricePerInch: 55,
        description: `More than a door — it's everyday peace of mind. The Tectone Insect Screen Swing Door is designed to provide premium security without compromising on airflow, natural light, or modern design. Whether you're protecting your main entrance, backyard, or kitchen access, this swing door combines elegance with reinforced protection—perfect for Singapore’s urban homes.
        Built with high-tensile stainless steel mesh and heavy-duty aluminium framing, our swing doors offer a sleek solution that enhances both safety and ventilation`,
        image: SwingDoor,
        perfectFor: [
            "Main entrances in HDB flats, condos, and landed homes",
            "Back doors or service yards",
            "Kitchens that need airflow but can't compromise on safety"
        ],
        features: [
            "Smooth track system",
            "Multi-point locking",
            "Space-saving design",
            "Easy operation"
        ],
        securityStyle: [
            "Over 10 years of experience in architectural and insect screen products",
            "Specialists in smart insect screen solutions for Singaporean homes",
            "Professionally measured, fabricated, and installed doors",
            "Seamless fit and maximum protection guaranteed",
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],
    },
    {
        id: "104-security-folding-door",
        title: "Insect Screen Folding Door",
        pricePerInch: 55,
        description: `The Tectone Insect Screen Folding Door is the ideal choice for wider openings that require both maximum access and strong security. Designed to fold neatly to the side when opened, this door system is perfect for balconies, patios, storefronts, and open-plan living spaces where you want an unobstructed walkway without compromising on safety.

Crafted from stainless steel mesh and reinforced aluminium, it delivers high performance against forced entry while maintaining excellent airflow, light penetration, and visual openness.`,
        image: FoldingDoor,
        perfectFor: [
            "Balcony or garden doors in condominiums and landed homes",
            "Shopfronts and cafés with large entrancesty",
            "Indoor-outdoor living areas that need both security and openness"
        ],
        features: [
            "High-Tensile Stainless Steel Mesh (SS304)",
            "Powder-Coated Aluminium Frame",
            "Folding Panel Mechanism",
            "Multi-Point Locking System",
            "Custom Configuration",
            "Pet and Child Friendly",
        ],
        securityStyle: [
            "Over 10 years of experience in the industry",
            "Reliable and secure folding door systems",
            "Suitable for both residential and commercial spaces in Singapore",
            "Maintain high standards of protection and ease of use",
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],
    },
    {
        id: "105-security-sliding-door",
        title: "Insect Screen Sliding Door",
        pricePerInch: 55,
        description: `The Tectone Insect Sliding Door is built for homeowners who value both security and seamless design. Perfect for balconies, patios, and large glass entrances, this door system combines high-tensile stainless steel mesh with a heavy-duty aluminium frame, giving you a strong barrier against intruders while maintaining excellent ventilation and visibility.

Its sleek sliding mechanism ensures easy daily use, while its modern, minimalist design fits beautifully into Singaporean apartments and landed homes.`,
        image: SlidingDoor,
        features: [
            "Stainless Steel Mesh (SS304)",
            "Heavy-Duty Aluminium Frame",
            "Smooth Sliding System",
            "Multi-Point Locking",
            "Clean and Modern Aesthetic",
            "Custom-Built for Precision Fit",
        ],
        perfectFor: [
            "Balcony entrances in condominiums or HDB flats",
            "Patio or garden access in landed homes",
            "Commercial properties needing a secure but stylish sliding entrance"
        ],
        securityStyle: [
            "Over 10 years of experience in insect screen solutions",
            "Specially designed for local conditions",
            "Sliding doors are durable and secure",
            "Space-efficient - ideal for modern urban homes",
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],

    },
    {
        id: "103-security-casement-window",
        title: "Casement Window",
        pricePerInch: 29,
        description: `The Tectone Security Casement Window offers the perfect combination of natural ventilation, clear visibility, and robust protection. Designed to match the clean lines of outward-opening windows, it’s an ideal security upgrade for bedrooms, kitchens, bathrooms, and service yards in Singaporean homes.

Made with high-tensile stainless steel mesh and a reinforced aluminium frame, this insect screen window keeps intruders and insects out — while letting fresh air and light in.`,
        image: CasementWindow,
        features: [
            "Stainless Steel Mesh (SS304)",
            "Heavy-Duty Aluminium Frame",
            "Outward Opening Compatibility",
            "Secure Locking System",
            "Slim, Modern Profile",
            "Child and Pet Safe"
        ],
        perfectFor: [
            "HDB flats and condominiums with casement-style windows",
            "Kitchen and bathroom windows that require ventilation and privacy",
            "Service yards or back-of-house areas where security is essential"
        ],
        securityStyle: [
            "Backed by years of local expertise",
            "Custom-made insect screen casement windows",
            "Installed by experienced professionals",
            "Built for reliable performance in Singapore’s climate",
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],
    },
    {
        id: "106-security-sliding-window",
        title: "Insect Screen Sliding Window",
        pricePerInch: 29,
        description: `The Tectone Insect Screen Sliding Window is designed for modern homes that require strong protection without sacrificing airflow or visibility. Ideal for bedrooms, kitchens, bathrooms, and balconies, this insect screen solution allows you to slide your window open for fresh air—while staying protected from both intruders and pests.

Made with high-tensile stainless steel mesh and a custom-fitted aluminium frame, this sliding window screen adds a layer of security while blending effortlessly into your existing window system.`,
        image: SlidingWindow,
        features: [
            "SS304 Stainless Steel Mesh",
            "Smooth Sliding Track System",
            "Durable Aluminium Frame",
            "Discreet, Minimalist Design",
            "Multi-Point Locking Option",
            "Child and Pet Friendly",
        ],
        perfectFor: [
            "HDB and condominium units with sliding windows",
            "High-rise homes looking for ventilation and security",
            "Kitchens and bathrooms with limited space for casement windows",
        ],
        securityStyle: [
            "Backed by years of local expertise",
            "Custom-made insect screen casement windows",
            "Installed by experienced professionals",
            "Built for reliable performance in Singapore’s climate",
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],
    },
    {
        id: "102-fixed-screen",
        title: "Fixed Insect Screen",
        pricePerInch: 29,
        description: `The Tectone Fixed Mosquito Screen offers a simple, durable, and cost-effective solution for areas that require continuous insect protection. Designed to remain in place year-round, this screen is perfect for ventilation windows, utility areas, bathrooms, storerooms, and service yards, where frequent access isn’t needed but airflow is essential.

Constructed with stainless steel mesh and a sleek aluminium frame, it provides strong resistance against pests and weather—while blending discreetly into your window structure.`,
        image: FixedScene,
        features: [
            "Stainless Steel Mesh (SS304)",
            "Durable Aluminium Frame",
            "Clean, Minimalist Appearance",
            "Excellent Ventilation",
            "Cost-Effective Design",
            "Custom-Made to Fit",
        ],
        perfectFor: [
            "Bathrooms, storerooms, and service yard windows",
            "Utility areas that don't require window access",
            "HDB flats and condos where simple, permanent insect control is needed",
        ],
        securityStyle: [
            "Practical choice for long-term insect protection",
            "Low-profile and discreet design",
            "Backed by 10+ years of industry experience",
            "Precise installation by experts",
            "Built for lasting performance"
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],
    },
    {
        id: "108-security-top-hung",
        title: "Top Hung Window",
        pricePerInch: 29,
        description: `The Tectone Insect Screen Top Hung Window is specially designed for ventilation with added security, even during light rain. Commonly used in bathrooms, stairwells, and corridors, this window screen provides constant airflow, visibility, and insect protection while preventing unauthorised access from the outside.

Built with high-tensile stainless steel mesh and a powder-coated aluminium frame, the system is both durable and discreet, making it a practical upgrade for homes across Singapore.`,
        image: TongHung,
        features: [
            "SS304 Stainless Steel Mesh",
            "Durable Aluminium Frame",
            "Compatible with Top-Hung Window Designs",
            "Water-Tolerant Ventilation",
            "Low Maintenance",
            "Safe for Homes with Children or Elderly",
        ],
        perfectFor: [
            "Bathrooms, storerooms, and service yard windows",
            "Utility areas that don't require window access",
            "HDB flats and condos where simple, permanent insect control is needed",
        ],
        securityStyle: [
            "Practical choice for long-term insect protection",
            "Low-profile and discreet design",
            "Backed by 10+ years of industry experience",
            "Precise installation by experts",
            "Built for lasting performance"
        ],
        specifications: [
            { label: "Material", value: "High-grade steel mesh" },
            { label: "Frame", value: "Powder-coated aluminum" },
            { label: "Thickness", value: "1.2mm - 2.0mm" },
            { label: "Mesh Size", value: "11mm x 11mm" },
            { label: "Warranty", value: "10 years" },
            { label: "Installation", value: "Professional installation included" }
        ],
    }
];
