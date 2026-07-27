/*
  The eight CoArea category icons, taken from the brand source SVGs
  (drive: Icons/*.svg) rather than approximated with a generic icon set.

  Two changes were made to the source:
  · the brand teal #008A84 became `currentColor`, so an icon takes the colour of
    whatever it sits in — teal on light, white on a filled teal diamond;
  · the white knockout areas became `var(--icon-knockout)`, which the diamond
    sets to its own background so those cut-outs stay invisible in both states.

  Element ids are prefixed per icon: Illustrator numbered the clip paths in
  every file identically ("b", "c", …) and eight icons share one page, so
  unprefixed ids would make every hatched icon reference the first one's clip.

  Stroke weight is normalised. As exported, three icons drew at the SVG default
  of 1 and five at 1.5, in viewBoxes ranging from 50.9 to 55.6 units — so the
  effective on-screen weight spanned 1/51 to 1.5/51, a 50% spread that was
  plainly visible in the eight-icon strip: the wheat read as a hairline while
  the market stall and football read as solid blocks. Each root `<svg>` now
  carries a single `strokeWidth` of 0.025 × its own viewBox width, which the
  shapes inherit, so all eight land on one optical weight regardless of the
  box they were drawn in. The 0.5 hatch lines keep their own width — they are
  meant to be finer than the outline they fill.

  The factor was 0.025, which put the drawn line at 0.70px where the strip
  renders at 28px and 1.20px at its largest. The private diamonds are filled
  with `.hatch-fine`, whose lines are a flat 1px — so the icon was being drawn
  *thinner than the texture behind it* and dissolved into it at exactly the
  sizes the homepage uses. 0.036 puts it at 1.0–1.7px, clear of the hatch at
  every size, and since it is applied per viewBox the eight stay level with each
  other. The drawings themselves are untouched: this is the one number the file
  already owned.

  Fills are deliberately left alone. The football is a filled ball with white
  knockouts and the tree has a filled crown; converting those silhouettes to
  outlines would redraw the brand's icons rather than tidy them.
*/
type IconProps = { className?: string }

/** Agrarfläche */
export function AgrarForstIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 51.356 54.369" className={className} strokeWidth={1.85} aria-hidden focusable="false">
      <g id="agrar-forst-c">
        <g>
          <line x1="15.118" y1="53.814" x2="15.118" y2="22.619" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="9.543 40.319 9.543 43.894 14.84 46.003 15.01 46.071 15.01 42.107 9.543 40.319" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="20.585 40.319 20.585 43.894 15.288 46.003 15.118 46.071 15.118 42.107 20.585 40.319" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="9.652 34.049 9.652 37.625 14.948 39.733 15.118 39.801 15.118 35.837 9.652 34.049" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="20.694 34.049 20.694 37.625 15.397 39.733 15.227 39.801 15.227 35.837 20.694 34.049" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="9.652 27.78 9.652 31.355 14.948 33.464 15.118 33.531 15.118 29.567 9.652 27.78" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="20.694 27.78 20.694 31.355 15.397 33.464 15.227 33.531 15.227 29.567 20.694 27.78" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="9.652 21.51 9.652 25.085 14.948 27.194 15.118 27.262 15.118 23.298 9.652 21.51" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="20.694 21.51 20.694 25.085 15.397 27.194 15.227 27.262 15.227 23.298 20.694 21.51" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="29.948" y1="54.369" x2="29.948" y2="23.174" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="24.373 40.874 24.373 44.449 29.67 46.558 29.84 46.625 29.84 42.661 24.373 40.874" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="35.415 40.874 35.415 44.449 30.118 46.558 29.948 46.625 29.948 42.661 35.415 40.874" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="24.481 34.604 24.481 38.179 29.778 40.288 29.948 40.356 29.948 36.392 24.481 34.604" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="35.524 34.604 35.524 38.179 30.227 40.288 30.057 40.356 30.057 36.392 35.524 34.604" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="24.481 28.334 24.481 31.91 29.778 34.018 29.948 34.086 29.948 30.122 24.481 28.334" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="35.524 28.334 35.524 31.91 30.227 34.018 30.057 34.086 30.057 30.122 35.524 28.334" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="24.481 22.065 24.481 25.64 29.778 27.749 29.948 27.816 29.948 23.852 24.481 22.065" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="35.524 22.065 35.524 25.64 30.227 27.749 30.057 27.816 30.057 23.852 35.524 22.065" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="45.281" y1="54.369" x2="45.281" y2="23.174" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="39.705 40.874 39.705 44.449 45.002 46.558 45.172 46.625 45.172 42.661 39.705 40.874" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="50.748 40.874 50.748 44.449 45.451 46.558 45.281 46.625 45.281 42.661 50.748 40.874" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="39.814 34.604 39.814 38.179 45.111 40.288 45.281 40.356 45.281 36.392 39.814 34.604" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="50.856 34.604 50.856 38.179 45.559 40.288 45.389 40.356 45.389 36.392 50.856 34.604" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="39.814 28.334 39.814 31.91 45.111 34.018 45.281 34.086 45.281 30.122 39.814 28.334" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="50.856 28.334 50.856 31.91 45.559 34.018 45.389 34.086 45.389 30.122 50.856 28.334" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="39.814 22.065 39.814 25.64 45.111 27.749 45.281 27.816 45.281 23.852 39.814 22.065" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="50.856 22.065 50.856 25.64 45.559 27.749 45.389 27.816 45.389 23.852 50.856 22.065" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <ellipse cx="9.76" cy="7.801" rx="3.958" ry="3.264" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="5.327" y1="10.521" x2="2.008" y2="12.827" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="19.064" y1="6.237" x2="14.877" y2="7.178" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="12.468" y1=".147" x2="11.4" y2="3.616" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="16.97" y1="13.201" x2="13.718" y2="10.831" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1=".022" y1="6.859" x2="4.356" y2="7.049" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="3.977" y1="1.574" x2="6.678" y2="4.376" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="9.653" y1="11.999" x2="9.867" y2="15.574" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        </g>
      </g>
    </svg>
  )
}

/** Gewerbliche Fläche */
export function GewerbeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 51.284 51.446" className={className} strokeWidth={1.85} aria-hidden focusable="false">
      <g id="gewerbe-c">
        <path d="m50.784,50.946V.5H.5v50.446h5.465s0-41.177,0-41.177h39.234v41.177h5.585Z" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
        <rect x="12.74" y="38.615" width="12.641" height="11.966" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <rect x="17.406" y="38.615" width="3.814" height="6.829" fill="currentColor" />
        <rect x="25.381" y="38.615" width="12.641" height="11.966" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <rect x="30.048" y="38.615" width="3.814" height="6.829" fill="currentColor" />
        <rect x="19.061" y="26.65" width="12.641" height="11.966" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <rect x="23.727" y="26.65" width="3.814" height="6.829" fill="currentColor" />
      </g>
    </svg>
  )
}

/** Innerstädtisch öffentliche Grünanlagen */
export function GruenanlagenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 55.193 51.884" className={className} strokeWidth={1.99} aria-hidden focusable="false">
      <g id="gruenanlagen-c">
        <g>
          <line x1="17.027" y1="50.928" x2="17.027" y2="36.069" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <ellipse cx="16.982" cy="18.41" rx="16.232" ry="17.66" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="17.027" y1="6.303" x2="17.027" y2="36.825" fill="none" stroke="var(--icon-knockout, #fff)" strokeMiterlimit="10" />
          <line x1="2.423" y1="50.928" x2="31.631" y2="50.928" fill="none" stroke="currentColor" strokeMiterlimit="10" />
          <line x1="17.027" y1="28.616" x2="24.726" y2="23.948" fill="none" stroke="var(--icon-knockout, #fff)" strokeMiterlimit="10" />
          <line x1="17.027" y1="18.757" x2="24.726" y2="14.09" fill="none" stroke="var(--icon-knockout, #fff)" strokeMiterlimit="10" />
          <line x1="17.027" y1="18.053" x2="10.611" y2="14.795" fill="none" stroke="var(--icon-knockout, #fff)" strokeMiterlimit="10" />
        </g>
        <polyline points="34.416 51.884 34.416 33.593 54.443 33.593 54.443 51.884" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="34.416" y1="45.451" x2="54.383" y2="45.451" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="34.416" y1="40.391" x2="54.443" y2="40.391" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="34.386" y1="37.221" x2="54.413" y2="37.221" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="37.675" y1="33.593" x2="37.675" y2="45.451" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="51.078" y1="33.471" x2="51.078" y2="45.33" fill="none" stroke="currentColor" strokeMiterlimit="10" />
      </g>
    </svg>
  )
}

/** Innerstädtisch öffentliche Plätze */
export function OeffentlichePlaetzeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 52.733 51.54" className={className} strokeWidth={1.90} aria-hidden focusable="false">
      <g id="oeffentliche-plaetze-c">
        <rect x="16.408" y="19.486" width="19.925" height="42.683" transform="translate(67.197 14.457) rotate(90)" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m1.19,14.14c16.84.069,33.679.139,50.519.208L45.791,0H7.079c-1.963,4.713-3.925,9.427-5.888,14.14Z" fill="currentColor" />
        <path d="m1.19,14.14c-.729,1.734-.552,3.655.528,4.954,1.124,1.352,2.798,1.515,3.31,1.565.313.03,2.052.199,3.461-.824,2.378-1.727,2.215-5.689,2.523-5.654.256.029-.473,2.691.917,4.66,1.032,1.463,2.746,1.853,3.292,1.977,1.79.408,4.1.09,5.536-1.327,1.972-1.947,1.596-5.279,1.911-5.262.325.018-.446,3.497,1.414,5.338,1.284,1.272,3.481,1.424,5.006,1.07.585-.136,1.476-.342,2.217-1.07,1.807-1.775,1.162-5.113,1.376-5.121.213-.008-.157,3.339,1.758,5.045.869.774,1.901.937,2.293.994.259.038,2.362.309,3.783-1.108.563-.561.791-1.16,1.065-1.88.461-1.212.541-2.288.541-2.974-.007.4-.007,2.557,1.678,4.194.299.29,1.442,1.368,3.254,1.51.517.041,1.899.128,3.169-.813,1.652-1.223,1.75-3.172,1.758-3.401.024-.716-.137-1.298-.272-1.665-16.839-.069-33.679-.139-50.518-.208Z" fill="currentColor" stroke="var(--icon-knockout, #fff)" strokeMiterlimit="10" />
        <line x1="47.712" y1="33.653" x2="47.712" y2="20.227" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m5.028,34.466v-13.808" fill="none" stroke="currentColor" strokeMiterlimit="10" />
      </g>
    </svg>
  )
}

/** Innerstädtisch private Gärten */
export function PrivateGaertenIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 52.439 49.98" className={className} strokeWidth={1.89} aria-hidden focusable="false">
      <defs>
        <clipPath id="private-gaerten-e">
          <path d="m21.873,12.719c.003.029-1.126-.085-2.15.51-1.221.71-1.59,2.022-1.633,2.183-.062.233-.352,1.42.293,2.627.653,1.222,1.821,1.636,2.408,1.844.474.168,2.241.795,3.938-.196,1.297-.757,1.775-2.005,1.91-2.408.207.367.544.873,1.066,1.372.227.217.864.815,1.803,1.181.39.152,2.385.93,4.163-.222.201-.13,1.488-.995,1.771-2.666.05-.296.22-1.4-.434-2.531-.792-1.371-2.183-1.723-2.43-1.781.592.057,1.571.076,2.693-.279.775-.245,1.491-.472,2.031-1.151.95-1.195.548-2.781.468-3.07-.352-1.269-1.264-1.952-1.571-2.175-1.085-.787-2.211-.822-2.772-.839-1.218-.037-2.17.327-2.698.581.12-.312.28-.855.229-1.529-.083-1.105-.68-1.837-.921-2.123-1.023-1.218-2.44-1.45-2.942-1.525-.609-.09-1.668-.248-2.749.361-1.593.897-1.844,2.674-1.859,2.795-.125,1.008.204,1.8.368,2.135-.404-.096-.981-.216-1.682-.303-1.262-.156-1.903-.235-2.683-.039-.351.088-1.581.396-2.386,1.565-.18.262-.805,1.2-.626,2.446.149,1.037.769,1.685,1.031,1.952.751.763,1.614,1.001,2.179,1.149,1.67.438,3.18.1,3.183.133Z" fill="none" />
        </clipPath>
      </defs>
      <g id="private-gaerten-c">
        <line x1=".5" y1="49.978" x2=".5" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="6.768" y1="49.978" x2="6.768" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="13.188" y1="49.978" x2="13.188" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="19.765" y1="49.978" x2="19.765" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="32.674" y1="49.978" x2="32.674" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="38.942" y1="49.978" x2="38.942" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="45.362" y1="49.978" x2="45.362" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="51.939" y1="49.978" x2="51.939" y2="31.16" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m26.515,49.978c.046-11.944.091-23.887.137-35.831" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m19.765,12.703c-2.397,0-4.325-1.664-4.325-3.707,0-2.022,1.928-3.686,4.325-3.686s4.325,1.664,4.325,3.686c0,2.043-1.928,3.707-4.325,3.707Z" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m26.619,16.395c0,2.046-1.956,3.713-4.357,3.713-2.376,0-4.332-1.667-4.332-3.713,0-2.025,1.956-3.692,4.332-3.692,2.401,0,4.357,1.667,4.357,3.692Z" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m37.863,8.901c0,2.096-2.003,3.803-4.437,3.803-2.459,0-4.462-1.707-4.462-3.803,0-2.074,2.003-3.781,4.462-3.781,2.434,0,4.437,1.707,4.437,3.781Z" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m26.62,7.534c-2.288,0-4.151-1.568-4.151-3.517s1.863-3.517,4.151-3.517c2.264,0,4.127,1.568,4.127,3.517s-1.863,3.517-4.127,3.517Z" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <path d="m35.495,16.395c0,2.046-1.956,3.713-4.357,3.713-2.377,0-4.332-1.667-4.332-3.713,0-2.025,1.956-3.692,4.332-3.692,2.401,0,4.357,1.667,4.357,3.692Z" fill="none" stroke="currentColor" strokeMiterlimit="10" />
      </g>
      <g id="private-gaerten-d">
        <g clipPath="url(#private-gaerten-e)" fill="none">
          <g>
            <line x1="-30.694" y1="25.468" x2="25.426" y2="-30.652" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-29.405" y1="26.756" x2="26.715" y2="-29.364" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-28.117" y1="28.044" x2="28.003" y2="-28.075" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-26.828" y1="29.333" x2="29.292" y2="-26.787" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-25.54" y1="30.621" x2="30.58" y2="-25.498" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-24.251" y1="31.91" x2="31.868" y2="-24.21" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-22.963" y1="33.198" x2="33.157" y2="-22.921" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-21.674" y1="34.487" x2="34.445" y2="-21.633" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-20.386" y1="35.775" x2="35.734" y2="-20.344" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-19.097" y1="37.064" x2="37.022" y2="-19.056" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-17.809" y1="38.352" x2="38.311" y2="-17.767" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-16.52" y1="39.641" x2="39.599" y2="-16.479" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-15.232" y1="40.929" x2="40.888" y2="-15.19" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-13.943" y1="42.218" x2="42.176" y2="-13.902" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-12.655" y1="43.506" x2="43.465" y2="-12.613" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-11.366" y1="44.795" x2="44.753" y2="-11.325" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-10.078" y1="46.083" x2="46.042" y2="-10.037" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-8.79" y1="47.372" x2="47.33" y2="-8.748" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-7.501" y1="48.66" x2="48.619" y2="-7.46" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-6.213" y1="49.949" x2="49.907" y2="-6.171" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-4.924" y1="51.237" x2="51.196" y2="-4.883" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-3.636" y1="52.526" x2="52.484" y2="-3.594" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-2.347" y1="53.814" x2="53.773" y2="-2.306" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-1.059" y1="55.102" x2="55.061" y2="-1.017" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1=".23" y1="56.391" x2="56.349" y2=".271" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="1.518" y1="57.679" x2="57.638" y2="1.56" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="2.807" y1="58.968" x2="58.926" y2="2.848" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="4.095" y1="60.256" x2="60.215" y2="4.137" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="5.384" y1="61.545" x2="61.503" y2="5.425" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="6.672" y1="62.833" x2="62.792" y2="6.714" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="7.961" y1="64.122" x2="64.08" y2="8.002" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="9.249" y1="65.41" x2="65.369" y2="9.291" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="10.538" y1="66.699" x2="66.657" y2="10.579" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="11.826" y1="67.987" x2="67.946" y2="11.868" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="13.115" y1="69.276" x2="69.234" y2="13.156" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="14.403" y1="70.564" x2="70.523" y2="14.445" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="15.692" y1="71.853" x2="71.811" y2="15.733" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="16.98" y1="73.141" x2="73.1" y2="17.021" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="18.268" y1="74.43" x2="74.388" y2="18.31" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="19.557" y1="75.718" x2="75.677" y2="19.598" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="20.845" y1="77.007" x2="76.965" y2="20.887" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="22.134" y1="78.295" x2="78.254" y2="22.175" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="23.422" y1="79.584" x2="79.542" y2="23.464" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="24.711" y1="80.872" x2="80.831" y2="24.752" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="25.999" y1="82.16" x2="82.119" y2="26.041" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
          </g>
        </g>
        <ellipse cx="26.654" cy="10.815" rx="4.544" ry="3.873" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
      </g>
    </svg>
  )
}

/** Innerstädtisch private Plätze */
export function PrivatePlaetzeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 50.985 50.609" className={className} strokeWidth={1.84} aria-hidden focusable="false">
      <defs>
        <clipPath id="private-plaetze-e">
          <path d="m.75,49.861V14.74C5.042,10.192,9.335,5.643,13.627,1.095c4.257,4.548,8.514,9.097,12.771,13.645v16.695h23.837v18.426h-3.459v-12.593h-16.996v12.593H.75Z" fill="none" />
        </clipPath>
      </defs>
      <g id="private-plaetze-c">
        <line x1="30.164" y1="42.27" x2="46.776" y2="42.27" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <polyline points="29.781 36.751 29.781 49.859 46.914 49.859" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="30.164" y1="46.44" x2="46.646" y2="46.44" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <line x1="26.398" y1="30.369" x2="26.398" y2="49.859" fill="none" stroke="currentColor" strokeMiterlimit="10" />
      </g>
      <g id="private-plaetze-d">
        <path d="m.75,49.859V14.738C5.042,10.191,9.335,5.643,13.627,1.095c4.257,4.548,8.514,9.096,12.771,13.643v16.695h23.837v18.426h-3.459v-12.593h-16.996v12.593H.75Z" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        <g clipPath="url(#private-plaetze-e)" fill="none">
          <g>
            <line x1="-29.152" y1="26.243" x2="26.968" y2="-29.877" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-27.864" y1="27.531" x2="28.256" y2="-28.589" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-26.575" y1="28.82" x2="29.545" y2="-27.3" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-25.287" y1="30.108" x2="30.833" y2="-26.012" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-23.998" y1="31.397" x2="32.121" y2="-24.723" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-22.71" y1="32.685" x2="33.41" y2="-23.435" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-21.421" y1="33.973" x2="34.698" y2="-22.146" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-20.133" y1="35.262" x2="35.987" y2="-20.858" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-18.844" y1="36.55" x2="37.275" y2="-19.569" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-17.556" y1="37.839" x2="38.564" y2="-18.281" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-16.267" y1="39.127" x2="39.852" y2="-16.992" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-14.979" y1="40.416" x2="41.141" y2="-15.704" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-13.69" y1="41.704" x2="42.429" y2="-14.415" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-12.402" y1="42.993" x2="43.718" y2="-13.127" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-11.113" y1="44.281" x2="45.006" y2="-11.838" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-9.825" y1="45.57" x2="46.295" y2="-10.55" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-8.537" y1="46.858" x2="47.583" y2="-9.261" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-7.248" y1="48.147" x2="48.872" y2="-7.973" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-5.96" y1="49.435" x2="50.16" y2="-6.685" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-4.671" y1="50.724" x2="51.449" y2="-5.396" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-3.383" y1="52.012" x2="52.737" y2="-4.108" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-2.094" y1="53.301" x2="54.026" y2="-2.819" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="-.806" y1="54.589" x2="55.314" y2="-1.531" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1=".483" y1="55.878" x2="56.602" y2="-.242" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="1.771" y1="57.166" x2="57.891" y2="1.046" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="3.06" y1="58.454" x2="59.179" y2="2.335" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="4.348" y1="59.743" x2="60.468" y2="3.623" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="5.637" y1="61.031" x2="61.756" y2="4.912" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="6.925" y1="62.32" x2="63.045" y2="6.2" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="8.214" y1="63.608" x2="64.333" y2="7.489" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="9.502" y1="64.897" x2="65.622" y2="8.777" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="10.791" y1="66.185" x2="66.91" y2="10.066" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="12.079" y1="67.474" x2="68.199" y2="11.354" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="13.368" y1="68.762" x2="69.487" y2="12.643" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="14.656" y1="70.051" x2="70.776" y2="13.931" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="15.945" y1="71.339" x2="72.064" y2="15.22" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="17.233" y1="72.628" x2="73.353" y2="16.508" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="18.521" y1="73.916" x2="74.641" y2="17.797" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="19.81" y1="75.205" x2="75.93" y2="19.085" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="21.098" y1="76.493" x2="77.218" y2="20.373" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="22.387" y1="77.782" x2="78.507" y2="21.662" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="23.675" y1="79.07" x2="79.795" y2="22.95" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="24.964" y1="80.359" x2="81.084" y2="24.239" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="26.252" y1="81.647" x2="82.372" y2="25.527" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            <line x1="27.541" y1="82.936" x2="83.66" y2="26.816" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
          </g>
        </g>
      </g>
    </svg>
  )
}

/** öffentliche Sportfläche */
export function OeffentlicherSportIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 55.115 55.115" className={className} strokeWidth={1.98} aria-hidden focusable="false">
      <g id="oeffentlicher-sport-c">
        <g>
          <circle cx="27.558" cy="27.558" r="27.058" fill="currentColor" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="9.996 17.496 1.283 22.527 1.283 32.588 9.996 37.619 18.71 32.588 18.71 22.527 9.996 17.496" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="18.683 32.94 9.97 37.97 9.97 48.032 18.683 53.062 27.397 48.032 27.397 37.97 18.683 32.94" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="18.72 2.664 10.007 7.695 9.772 17.35 18.251 21.974 26.965 16.944 27.199 7.289 18.72 2.664" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="36.041 32.665 27.328 37.695 27.405 47.891 36.196 53.056 44.91 48.025 44.832 37.83 36.041 32.665" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="35.97 2.023 27.257 7.053 27.257 17.115 35.97 22.145 44.684 17.115 44.684 7.053 35.97 2.023" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
          <polygon points="44.755 17.237 36.041 22.268 36.041 32.33 44.755 37.36 53.468 32.33 53.468 22.268 44.755 17.237" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        </g>
      </g>
    </svg>
  )
}

/** private Sportfläche */
export function PrivaterSportIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 55.615 55.615" className={className} strokeWidth={2.00} aria-hidden focusable="false">
      <defs>
        <clipPath id="privater-sport-d">
          <circle cx="27.808" cy="27.808" r="27.058" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        </clipPath>
      </defs>
      <g id="privater-sport-c">
        <g>
          <g clipPath="url(#privater-sport-d)" fill="none">
            <g>
              <line x1="-28.686" y1="30.591" x2="27.434" y2="-25.528" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-27.397" y1="31.88" x2="28.723" y2="-24.24" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-26.109" y1="33.168" x2="30.011" y2="-22.951" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-24.82" y1="34.457" x2="31.299" y2="-21.663" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-23.532" y1="35.745" x2="32.588" y2="-20.374" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-22.243" y1="37.034" x2="33.876" y2="-19.086" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-20.955" y1="38.322" x2="35.165" y2="-17.797" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-19.666" y1="39.611" x2="36.453" y2="-16.509" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-18.378" y1="40.899" x2="37.742" y2="-15.22" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-17.089" y1="42.188" x2="39.03" y2="-13.932" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-15.801" y1="43.476" x2="40.319" y2="-12.644" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-14.512" y1="44.765" x2="41.607" y2="-11.355" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-13.224" y1="46.053" x2="42.896" y2="-10.067" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-11.935" y1="47.342" x2="44.184" y2="-8.778" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-10.647" y1="48.63" x2="45.473" y2="-7.49" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-9.358" y1="49.919" x2="46.761" y2="-6.201" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-8.07" y1="51.207" x2="48.05" y2="-4.913" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-6.782" y1="52.495" x2="49.338" y2="-3.624" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-5.493" y1="53.784" x2="50.627" y2="-2.336" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-4.205" y1="55.072" x2="51.915" y2="-1.047" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-2.916" y1="56.361" x2="53.204" y2=".241" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-1.628" y1="57.649" x2="54.492" y2="1.53" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="-.339" y1="58.938" x2="55.78" y2="2.818" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1=".949" y1="60.226" x2="57.069" y2="4.107" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="2.238" y1="61.515" x2="58.357" y2="5.395" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="3.526" y1="62.803" x2="59.646" y2="6.684" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="4.815" y1="64.092" x2="60.934" y2="7.972" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="6.103" y1="65.38" x2="62.223" y2="9.261" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="7.392" y1="66.669" x2="63.511" y2="10.549" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="8.68" y1="67.957" x2="64.8" y2="11.838" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="9.969" y1="69.246" x2="66.088" y2="13.126" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="11.257" y1="70.534" x2="67.377" y2="14.414" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="12.546" y1="71.823" x2="68.665" y2="15.703" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="13.834" y1="73.111" x2="69.954" y2="16.991" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="15.123" y1="74.4" x2="71.242" y2="18.28" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="16.411" y1="75.688" x2="72.531" y2="19.568" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="17.699" y1="76.977" x2="73.819" y2="20.857" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="18.988" y1="78.265" x2="75.108" y2="22.145" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="20.276" y1="79.553" x2="76.396" y2="23.434" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="21.565" y1="80.842" x2="77.685" y2="24.722" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="22.853" y1="82.13" x2="78.973" y2="26.011" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="24.142" y1="83.419" x2="80.262" y2="27.299" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="25.43" y1="84.707" x2="81.55" y2="28.588" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="26.719" y1="85.996" x2="82.838" y2="29.876" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
              <line x1="28.007" y1="87.284" x2="84.127" y2="31.165" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth=".5" />
            </g>
          </g>
          <circle cx="27.808" cy="27.808" r="27.058" fill="none" stroke="currentColor" strokeMiterlimit="10" />
        </g>
        <polygon points="10.246 17.746 1.533 22.777 1.533 32.838 10.246 37.869 18.96 32.838 18.96 22.777 10.246 17.746" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <polygon points="18.933 33.19 10.22 38.22 10.22 48.282 18.933 53.312 27.647 48.282 27.647 38.22 18.933 33.19" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <polygon points="18.732 2.501 10.019 7.532 9.903 17.394 18.501 22.224 27.215 17.194 27.33 7.332 18.732 2.501" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <polygon points="36.291 32.915 27.578 37.945 27.655 48.141 36.446 53.306 45.16 48.275 45.082 38.08 36.291 32.915" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <polygon points="36.22 2.273 27.507 7.303 27.507 17.365 36.22 22.395 44.934 17.365 44.934 7.303 36.22 2.273" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
        <polygon points="45.11 17.13 36.012 22.382 35.969 32.815 45.025 37.994 54.123 32.741 54.166 22.309 45.11 17.13" fill="var(--icon-knockout, #fff)" stroke="currentColor" strokeMiterlimit="10" />
      </g>
    </svg>
  )
}

/** Slug → icon, matching CATEGORIES in lib/categories.ts. */
export const CATEGORY_ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  "agrar-forst": AgrarForstIcon,
  "gewerbe": GewerbeIcon,
  "gruenanlagen": GruenanlagenIcon,
  "oeffentliche-plaetze": OeffentlichePlaetzeIcon,
  "private-gaerten": PrivateGaertenIcon,
  "private-plaetze": PrivatePlaetzeIcon,
  "oeffentlicher-sport": OeffentlicherSportIcon,
  "privater-sport": PrivaterSportIcon,
}
