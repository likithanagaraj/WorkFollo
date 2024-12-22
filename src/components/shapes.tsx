import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export const Shapes = {
  Star_1: ({ className }: Props) => (
    <svg
      className={cn("coolshapes star-1 bg-red-500", className)}
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#cs_clip_1_star-1)">
        <mask
          height="200"
          id="cs_mask_1_star-1"
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M200 100C200 44.772 155.228 0 100 0S0 44.772 0 100s44.772 100 100 100 100-44.772 100-100zm-85.203-14.798c8.22 8.22 20.701 9.967 45.664 13.462L170 100l-9.539 1.335c-24.963 3.495-37.444 5.242-45.664 13.462-8.219 8.22-9.967 20.701-13.462 45.664L100 170l-1.335-9.539c-3.495-24.963-5.243-37.444-13.462-45.664-8.22-8.22-20.701-9.967-45.664-13.462L30 100l9.539-1.336c24.963-3.495 37.444-5.242 45.664-13.462 8.22-8.22 9.967-20.7 13.462-45.663L100 30l1.335 9.538c3.495 24.963 5.243 37.445 13.462 45.664z"
            fill="#fff"
            fillRule="evenodd"
          />
        </mask>
        <g mask="url(#cs_mask_1_star-1)">
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill="#FFF9C5" fillOpacity="0.44" />
          <g filter="url(#filter0_f_748_4325)">
            <path
              d="M158 22H15v108h143V22z"
              fill="#00F0FF"
              fillOpacity="0.85"
            />
            <path d="M209 101H52v116h157V101z" fill="#FF58E4" />
            <ellipse
              cx="156"
              cy="80"
              fill="#FFE500"
              fillOpacity="0.79"
              rx="83"
              ry="57"
            />
          </g>
        </g>
      </g>
      <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_star-1)">
        <path
          d="M200 0H0v200h200V0z"
          fill="gray"
          stroke="transparent"
          filter="url(#cs_noise_1_star-1)"
        />
      </g>
      <defs>
        <filter
          height="315"
          id="filter0_f_748_4325"
          width="344"
          x="-45"
          y="-38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur
            result="effect1_foregroundBlur_748_4325"
            stdDeviation="30"
          />
        </filter>
        <clipPath id="cs_clip_1_star-1">
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
      <defs>
        <filter
          height="100%"
          id="cs_noise_1_star-1"
          width="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feBlend result="out3" in="SourceGraphic" in2="out2" />
        </filter>
      </defs>
    </svg>
  ),
};
