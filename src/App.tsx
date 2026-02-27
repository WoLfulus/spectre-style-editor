import { useState, useEffect, useRef, type CSSProperties, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react';

// Selected palette including standard colors and specific ones from your example
const rawColors = {
  aqua	:"#00FFFF",
  aquamarine1	:"#5FFFD7",
  aquamarine1_1	:"#87FFD7",
  aquamarine3	:"#5FD7AF",
  black	:"#000000",
  blue	:"#0000FF",
  blue1	:"#0000FF",
  blue3	:"#0000AF",
  blue3_1	:"#0000D7",
  blueviolet	:"#5F00FF",
  cadetblue	:"#5FAF87",
  cadetblue_1	:"#5FAFAF",
  chartreuse1	:"#87FF00",
  chartreuse2	:"#5FFF00",
  chartreuse2_1	:"#87D700",
  chartreuse3	:"#5FAF00",
  chartreuse3_1	:"#5FD700",
  chartreuse4	:"#5F8700",
  cornflowerblue	:"#5F87FF",
  cornsilk1	:"#FFFFD7",
  cyan	:"#00FFFF",
  cyan1	:"#00FFFF",
  cyan2	:"#00FFD7",
  cyan3	:"#00D7AF",
  darkblue	:"#000087",
  darkcyan	:"#00AF87",
  darkgoldenrod	:"#AF8700",
  darkgreen	:"#005F00",
  darkkhaki	:"#AFAF5F",
  darkmagenta	:"#870087",
  darkmagenta_1	:"#8700AF",
  darkolivegreen1	:"#D7FF5F",
  darkolivegreen1_1	:"#D7FF87",
  darkolivegreen2	:"#AFFF5F",
  darkolivegreen3	:"#87AF5F",
  darkolivegreen3_1	:"#87D75F",
  darkolivegreen3_2	:"#AFD75F",
  darkorange	:"#FF8700",
  darkorange3	:"#AF5F00",
  darkorange3_1	:"#D75F00",
  darkred	:"#5F0000",
  darkred_1	:"#870000",
  darkseagreen	:"#87AF87",
  darkseagreen1	:"#AFFFD7",
  darkseagreen1_1	:"#D7FFAF",
  darkseagreen2	:"#AFD7AF",
  darkseagreen2_1	:"#AFFFAF",
  darkseagreen3	:"#87D7AF",
  darkseagreen3_1	:"#AFD787",
  darkseagreen4	:"#5F875F",
  darkseagreen4_1	:"#5FAF5F",
  darkslategray1	:"#87FFFF",
  darkslategray2	:"#5FFFFF",
  darkslategray3	:"#87D7D7",
  darkturquoise	:"#00D7D7",
  darkviolet	:"#8700D7",
  darkviolet_1	:"#AF00D7",
  deeppink1	:"#FF0087",
  deeppink1_1	:"#FF00AF",
  deeppink2	:"#FF005F",
  deeppink3	:"#D7005F",
  deeppink3_1	:"#D70087",
  deeppink4	:"#5F005F",
  deeppink4_1	:"#87005F",
  deeppink4_2	:"#AF005F",
  deepskyblue1	:"#00AFFF",
  deepskyblue2	:"#00AFD7",
  deepskyblue3	:"#0087AF",
  deepskyblue3_1	:"#0087D7",
  deepskyblue4	:"#005F5F",
  deepskyblue4_1	:"#005F87",
  deepskyblue4_2	:"#005FAF",
  "default"	:"#000000",
  dodgerblue1	:"#0087FF",
  dodgerblue2	:"#005FFF",
  dodgerblue3	:"#005FD7",
  fuchsia	:"#FF00FF",
  gold1	:"#FFD700",
  gold3	:"#AFAF00",
  gold3_1	:"#D7AF00",
  gray	:"#808080",
  gray0	:"#000000",
  gray100	:"#FFFFFF",
  gray11	:"#1C1C1C",
  gray15	:"#262626",
  gray19	:"#303030",
  gray23	:"#3A3A3A",
  gray27	:"#444444",
  gray3	:"#080808",
  gray30	:"#4E4E4E",
  gray35	:"#585858",
  gray37	:"#5F5F5F",
  gray39	:"#626262",
  gray42	:"#6C6C6C",
  gray46	:"#767676",
  gray50	:"#808080",
  gray53	:"#878787",
  gray54	:"#8A8A8A",
  gray58	:"#949494",
  gray62	:"#9E9E9E",
  gray63	:"#AF87AF",
  gray66	:"#A8A8A8",
  gray69	:"#AFAFAF",
  gray7	:"#121212",
  gray70	:"#B2B2B2",
  gray74	:"#BCBCBC",
  gray78	:"#C6C6C6",
  gray82	:"#D0D0D0",
  gray84	:"#D7D7D7",
  gray85	:"#DADADA",
  gray89	:"#E4E4E4",
  gray93	:"#EEEEEE",
  green	:"#008000",
  green1	:"#00FF00",
  green3	:"#00AF00",
  green3_1	:"#00D700",
  green4	:"#008700",
  greenyellow	:"#AFFF00",
  grey	:"#808080",
  grey0	:"#000000",
  grey100	:"#FFFFFF",
  grey11	:"#1C1C1C",
  grey15	:"#262626",
  grey19	:"#303030",
  grey23	:"#3A3A3A",
  grey27	:"#444444",
  grey3	:"#080808",
  grey30	:"#4E4E4E",
  grey35	:"#585858",
  grey37	:"#5F5F5F",
  grey39	:"#626262",
  grey42	:"#6C6C6C",
  grey46	:"#767676",
  grey50	:"#808080",
  grey53	:"#878787",
  grey54	:"#8A8A8A",
  grey58	:"#949494",
  grey62	:"#9E9E9E",
  grey63	:"#AF87AF",
  grey66	:"#A8A8A8",
  grey69	:"#AFAFAF",
  grey7	:"#121212",
  grey70	:"#B2B2B2",
  grey74	:"#BCBCBC",
  grey78	:"#C6C6C6",
  grey82	:"#D0D0D0",
  grey84	:"#D7D7D7",
  grey85	:"#DADADA",
  grey89	:"#E4E4E4",
  grey93	:"#EEEEEE",
  honeydew2	:"#D7FFD7",
  hotpink	:"#FF5FAF",
  hotpink_1	:"#FF5FD7",
  hotpink2	:"#D75FAF",
  hotpink3	:"#AF5F87",
  hotpink3_1	:"#D75F87",
  indianred	:"#AF5F5F",
  indianred_1	:"#D75F5F",
  indianred1	:"#FF5F5F",
  indianred1_1	:"#FF5F87",
  khaki1	:"#FFFF87",
  khaki3	:"#D7D75F",
  lightcoral	:"#FF8787",
  lightcyan1	:"#D7FFFF",
  lightcyan3	:"#AFD7D7",
  lightgoldenrod1	:"#FFFF5F",
  lightgoldenrod2	:"#D7D787",
  lightgoldenrod2_1	:"#FFD75F",
  lightgoldenrod2_2	:"#FFD787",
  lightgoldenrod3	:"#D7AF5F",
  lightgreen	:"#87FF5F",
  lightgreen_1	:"#87FF87",
  lightpink1	:"#FFAFAF",
  lightpink3	:"#D78787",
  lightpink4	:"#875F5F",
  lightsalmon1	:"#FFAF87",
  lightsalmon3	:"#AF875F",
  lightsalmon3_1	:"#D7875F",
  lightseagreen	:"#00AFAF",
  lightskyblue1	:"#AFD7FF",
  lightskyblue3	:"#87AFAF",
  lightskyblue3_1	:"#87AFD7",
  lightslateblue	:"#8787FF",
  lightslategrey	:"#8787AF",
  lightsteelblue	:"#AFAFFF",
  lightsteelblue1	:"#D7D7FF",
  lightsteelblue3	:"#AFAFD7",
  lightyellow3	:"#D7D7AF",
  lime	:"#00FF00",
  magenta	:"#FF00FF",
  magenta1	:"#FF00FF",
  magenta2	:"#D700FF",
  magenta2_1	:"#FF00D7",
  magenta3	:"#AF00AF",
  magenta3_1	:"#D700AF",
  magenta3_2	:"#D700D7",
  maroon	:"#800000",
  mediumorchid	:"#AF5FD7",
  mediumorchid1	:"#D75FFF",
  mediumorchid1_1	:"#FF5FFF",
  mediumorchid3	:"#AF5FAF",
  mediumpurple	:"#8787D7",
  mediumpurple1	:"#AF87FF",
  mediumpurple2	:"#AF5FFF",
  mediumpurple2_1	:"#AF87D7",
  mediumpurple3	:"#875FAF",
  mediumpurple3_1	:"#875FD7",
  mediumpurple4	:"#5F5F87",
  mediumspringgreen	:"#00FFAF",
  mediumturquoise	:"#5FD7D7",
  mediumvioletred	:"#AF0087",
  mistyrose1	:"#FFD7D7",
  mistyrose3	:"#D7AFAF",
  navajowhite1	:"#FFD7AF",
  navajowhite3	:"#AFAF87",
  navy	:"#000080",
  navyblue	:"#00005F",
  olive	:"#808000",
  orange1	:"#FFAF00",
  orange3	:"#D78700",
  orange4	:"#5F5F00",
  orange4_1	:"#875F00",
  orangered1	:"#FF5F00",
  orchid	:"#D75FD7",
  orchid1	:"#FF87FF",
  orchid2	:"#FF87D7",
  palegreen1	:"#87FFAF",
  palegreen1_1	:"#AFFF87",
  palegreen3	:"#5FD75F",
  palegreen3_1	:"#87D787",
  paleturquoise1	:"#AFFFFF",
  paleturquoise4	:"#5F8787",
  palevioletred1	:"#FF87AF",
  pink1	:"#FFAFD7",
  pink3	:"#D787AF",
  plum1	:"#FFAFFF",
  plum2	:"#D7AFFF",
  plum3	:"#D787D7",
  plum4	:"#875F87",
  purple	:"#800080",
  purple_1	:"#8700FF",
  purple_2	:"#AF00FF",
  purple3	:"#5F00D7",
  purple4	:"#5F0087",
  purple4_1	:"#5F00AF",
  red	:"#FF0000",
  red1	:"#FF0000",
  red3	:"#AF0000",
  red3_1	:"#D70000",
  rosybrown	:"#AF8787",
  royalblue1	:"#5F5FFF",
  salmon1	:"#FF875F",
  sandybrown	:"#FFAF5F",
  seagreen1	:"#5FFF87",
  seagreen1_1	:"#5FFFAF",
  seagreen2	:"#5FFF5F",
  seagreen3	:"#5FD787",
  silver	:"#C0C0C0",
  skyblue1	:"#87D7FF",
  skyblue2	:"#87AFFF",
  skyblue3	:"#5FAFD7",
  slateblue1	:"#875FFF",
  slateblue3	:"#5F5FAF",
  slateblue3_1	:"#5F5FD7",
  springgreen1	:"#00FF87",
  springgreen2	:"#00D787",
  springgreen2_1	:"#00FF5F",
  springgreen3	:"#00AF5F",
  springgreen3_1	:"#00D75F",
  springgreen4	:"#00875F",
  steelblue	:"#5F87AF",
  steelblue1	:"#5FAFFF",
  steelblue1_1	:"#5FD7FF",
  steelblue3	:"#5F87D7",
  tan	:"#D7AF87",
  teal	:"#008080",
  thistle1	:"#FFD7FF",
  thistle3	:"#D7AFD7",
  turquoise2	:"#00D7FF",
  turquoise4	:"#008787",
  violet	:"#D787FF",
  wheat1	:"#FFFFAF",
  wheat4	:"#87875F",
  white	:"#FFFFFF",
  yellow	:"#FFFF00",
  yellow1	:"#FFFF00",
  yellow2	:"#D7FF00",
  yellow3	:"#AFD700",
  yellow3_1	:"#D7D700",
  yellow4	:"#878700",
  yellow4_1	:"#87AF00"
};

// Helper to convert hex to HSL for sorting
const hexToHsl = (hex: string) => {
  let r = parseInt(hex.substring(1, 3), 16) / 255;
  let g = parseInt(hex.substring(3, 5), 16) / 255;
  let b = parseInt(hex.substring(5, 7), 16) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Sort colors by hue, then brightness
const sortedColors = Object.entries(rawColors)
  .map(([name, hex]) => ({ name, hex, ...hexToHsl(hex) }))
  .sort((a, b) => {
    // Group grayscales together
    if (a.s < 10 && b.s < 10) return a.l - b.l;
    if (a.s < 10) return -1;
    if (b.s < 10) return 1;
    
    // Sort by Hue, then Lightness
    if (Math.abs(a.h - b.h) > 10) return a.h - b.h;
    return a.l - b.l;
  });

type StyleProps = {
  bold: boolean; italic: boolean; underline: boolean;
  dim: boolean; invert: boolean; strikethrough: boolean;
  slowblink: boolean; rapidblink: boolean; color: string;
};

const parseStyleString = (styleStr: string): StyleProps => {
  const parts = styleStr.split(' ');
  const result = { 
    bold: false, italic: false, underline: false, 
    dim: false, invert: false, strikethrough: false, 
    slowblink: false, rapidblink: false,
    color: 'default' 
  };
  
  parts.forEach(part => {
    if (part === 'bold') result.bold = true;
    else if (part === 'italic') result.italic = true;
    else if (part === 'underline') result.underline = true;
    else if (part === 'dim') result.dim = true;
    else if (part === 'invert') result.invert = true;
    else if (part === 'strikethrough') result.strikethrough = true;
    else if (part === 'slowblink') result.slowblink = true;
    else if (part === 'rapidblink') result.rapidblink = true;
    else if (part) result.color = part;
  });
  
  return result;
};

const buildStyleString = (styleObj: StyleProps) => {
  const parts = [];
  if (styleObj.bold) parts.push('bold');
  if (styleObj.italic) parts.push('italic');
  if (styleObj.underline) parts.push('underline');
  if (styleObj.strikethrough) parts.push('strikethrough');
  if (styleObj.dim) parts.push('dim');
  if (styleObj.invert) parts.push('invert');
  if (styleObj.slowblink) parts.push('slowblink');
  if (styleObj.rapidblink) parts.push('rapidblink');
  if (styleObj.color && styleObj.color !== 'default') parts.push(styleObj.color);
  return parts.join(' ');
};

type ActiveEditor = {
  primaryKey: string;
  keys: string[];
  top: number;
  left: number;
};

export default function App() {
  const [styles, setStyles] = useState<Record<string, string>>({
    "Usage.Header": "bold gray39",
    "Usage.CurrentCommand": "bold gray42",
    "Usage.RequiredArgument": "bold gray46",
    "Usage.OptionalArgument": "italic gray50",
    "Usage.Options": "bold gray58",
    "Usage.Command": "bold gray42",
    
    "Description.Header": "bold gray39",
    
    "Options.Header": "bold gray39",
    "Options.RequiredOption": "bold gray69",
    "Options.RequiredOptionValue": "bold grey70",
    "Options.OptionalOptionValue": "italic gray74",
    "Options.DefaultValueHeader": "bold italic gray39",
    "Options.DefaultValue": "italic gray82",
    
    "Arguments.Header": "bold gray39",
    "Arguments.RequiredArgument": "bold gray46",
    "Arguments.OptionalArgument": "italic gray50",
    
    "Examples.Header": "bold gray39",
    "Examples.Arguments": "italic gray74",
    
    "Commands.Header": "bold gray39",
    "Commands.ChildCommand": "bold gray42",
    "Commands.RequiredArgument": "bold gray66"
  });

  const [activeEditor, setActiveEditor] = useState<ActiveEditor | null>(null);
  const [copied, setCopied] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importText, setImportText] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);

  // Close editor on outside click
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
        setActiveEditor(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openEditor = (e: ReactMouseEvent<HTMLElement>, path: string) => {
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    
    // Ensure the popover doesn't overflow the screen
    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX;
    
    const isBulk = e.ctrlKey || e.metaKey;
    const currentValue = styles[path];
    const keysToEdit = isBulk
      ? Object.keys(styles).filter(k => styles[k] === currentValue)
      : [path];

    setActiveEditor({ primaryKey: path, keys: keysToEdit, top, left });
  };

  const updateStyle = (updates: Partial<StyleProps>) => {
    setStyles(prev => {
      const currentParsed = parseStyleString(prev[activeEditor!.primaryKey]);
      const nextParsed = { ...currentParsed, ...updates };
      const newStyleString = buildStyleString(nextParsed);
      
      const nextStyles = { ...prev };
      activeEditor!.keys.forEach(k => {
        nextStyles[k] = newStyleString;
      });
      return nextStyles;
    });
  };

  const handleCopyCode = () => {
    const code = `var style = new HelpProviderStyle()
{
  Usage = new()
  {
    Header = "${styles["Usage.Header"]}",
    CurrentCommand = "${styles["Usage.CurrentCommand"]}",
    RequiredArgument = "${styles["Usage.RequiredArgument"]}",
    OptionalArgument = "${styles["Usage.OptionalArgument"]}",
    Options = "${styles["Usage.Options"]}",
    Command = "${styles["Usage.Command"]}",
  },

  Description = new()
  {
    Header = "${styles["Description.Header"]}",
  },

  Options = new()
  {
    Header = "${styles["Options.Header"]}",
    RequiredOption = "${styles["Options.RequiredOption"]}",
    RequiredOptionValue = "${styles["Options.RequiredOptionValue"]}",
    OptionalOptionValue = "${styles["Options.OptionalOptionValue"]}",
    DefaultValueHeader = "${styles["Options.DefaultValueHeader"]}",
    DefaultValue = "${styles["Options.DefaultValue"]}",
  },

  Arguments = new()
  {
    Header = "${styles["Arguments.Header"]}",
    RequiredArgument = "${styles["Arguments.RequiredArgument"]}",
    OptionalArgument = "${styles["Arguments.OptionalArgument"]}",
  },

  Examples = new()
  {
    Header = "${styles["Examples.Header"]}",
    Arguments = "${styles["Examples.Arguments"]}",
  },

  Commands = new()
  {
    Header = "${styles["Commands.Header"]}",
    ChildCommand = "${styles["Commands.ChildCommand"]}",
    RequiredArgument = "${styles["Commands.RequiredArgument"]}",
  },
};`;

    const textArea = document.createElement("textarea");
    textArea.value = code;
    // Move textarea out of visual viewport
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
    document.body.removeChild(textArea);
  };

  const applyImport = () => {
    const newStyles = { ...styles };
    let currentSection = null;

    const lines = importText.split('\n');
    for (const line of lines) {
      // Look for a section assignment like "Usage = new()" or "Usage = new HelpProviderStyle.Usage()"
      const sectionMatch = line.match(/(\w+)\s*=\s*new/);
      if (sectionMatch) {
        currentSection = sectionMatch[1];
        continue;
      }

      // If we are in a section, look for property assignments like 'Header = "bold blue",'
      if (currentSection) {
        const propMatch = line.match(/(\w+)\s*=\s*"([^"]+)"/);
        if (propMatch) {
          const key = `${currentSection}.${propMatch[1]}`;
          if (key in newStyles) { // Ensure we only overwrite keys we actually track
            newStyles[key] = propMatch[2];
          }
        }
      }
    }
    setStyles(newStyles);
    setIsImporting(false);
    setImportText("");
  };

  const getCss = (key: string): CSSProperties => {
    const parsed = parseStyleString(styles[key]);
    const hex = (rawColors as Record<string, string>)[parsed.color] || '#ffffff';
    
    const textDecoration = [];
    if (parsed.underline) textDecoration.push('underline');
    if (parsed.strikethrough) textDecoration.push('line-through');

    const animation = parsed.slowblink
      ? 'spectre-blink 1s step-end infinite'
      : parsed.rapidblink
        ? 'spectre-blink 0.3s step-end infinite'
        : undefined;

    return {
      color: parsed.invert ? '#0c0c0c' : hex,
      backgroundColor: parsed.invert ? hex : 'transparent',
      fontWeight: parsed.bold ? 'bold' : 'normal',
      fontStyle: parsed.italic ? 'italic' : 'normal',
      textDecoration: textDecoration.length > 0 ? textDecoration.join(' ') : 'none',
      opacity: parsed.dim ? 0.5 : 1,
      animation,
    };
  };

  // Components for layout
  const TermSpan = ({ path, children }: { path: string; children: ReactNode }) => {
    const isActive = activeEditor?.keys?.includes(path);
    return (
      <span 
        style={getCss(path)}
        className={`cursor-pointer transition-colors hover:bg-white/10 ${
          isActive 
            ? 'rounded outline outline-1 outline-blue-500' 
            : ''
        }`}
        onClick={(e) => openEditor(e, path)}
        title="Click to edit, Ctrl+Click to edit all matching values"
      >
        {children}
      </span>
    );
  };

  const CodeString = ({ path }: { path: string }) => {
    const isActive = activeEditor?.keys?.includes(path);
    return (
      <span 
        className={`cursor-pointer underline decoration-dotted rounded px-1 transition-colors ${
          isActive 
            ? 'bg-blue-900/50 decoration-blue-500 text-orange-200' 
            : 'text-orange-300 hover:text-orange-200 decoration-orange-500/50 hover:bg-slate-800'
        }`}
        onClick={(e) => openEditor(e, path)}
        title="Click to edit, Ctrl+Click to edit all matching values"
      >
        "{styles[path]}"
      </span>
    );
  };

  const StyleToggle = ({ prop, label, customClass = "" }: { prop: string; label: string; customClass?: string }) => {
    const isActive = (parseStyleString(styles[activeEditor!.primaryKey]) as Record<string, unknown>)[prop];
    return (
      <button 
        className={`py-1.5 text-xs rounded transition-colors ${customClass} ${isActive ? 'bg-blue-600 text-white shadow-inner' : 'bg-[#333] text-gray-300 hover:bg-[#444]'}`}
        onClick={() => updateStyle({ [prop]: !isActive })}
        title={`Toggle ${prop}`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex h-screen w-full bg-[#1e1e1e] text-gray-300 font-mono text-sm overflow-hidden">
      
      {/* Required for the blink animation */}
      <style>{`
        @keyframes spectre-blink {
          0%, 100% { visibility: visible; }
          50% { visibility: hidden; }
        }
      `}</style>

      {/* LEFT PANE: C# CODE EDITOR */}
      <div className="w-1/2 h-full border-r border-gray-700 overflow-y-auto p-6 bg-[#1e1e1e] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="text-gray-400 font-sans text-xs uppercase tracking-wider font-bold">Theme Configuration (C#)</div>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsImporting(!isImporting)}
              className={`px-3 py-1 text-xs font-sans rounded transition-colors ${isImporting ? 'bg-gray-600 text-white' : 'bg-[#333] text-gray-300 hover:bg-[#444]'}`}
            >
              {isImporting ? 'Cancel Import' : 'Import Code'}
            </button>
            {!isImporting && (
              <button 
                onClick={handleCopyCode}
                className={`px-3 py-1 text-xs font-sans rounded transition-colors ${copied ? 'bg-green-600 text-white' : 'bg-[#333] text-gray-300 hover:bg-[#444]'}`}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            )}
          </div>
        </div>

        {isImporting ? (
          <div className="flex flex-col flex-1 h-full">
            <p className="text-xs text-gray-400 mb-2 font-sans">
              Paste your C# <span className="text-blue-400 font-mono">HelpProviderStyle</span> snippet below. 
              The editor will automatically scan it and apply any matching values to the preview.
            </p>
            <textarea
              className="flex-1 w-full bg-[#0c0c0c] border border-gray-700 rounded p-4 text-gray-300 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={`var style = new HelpProviderStyle()\n{\n  Usage = new()\n  {\n    Header = "bold blue",\n...`}
            />
            <button
              onClick={applyImport}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-sans text-sm transition-colors shadow-lg"
            >
              Parse and Apply Theme
            </button>
          </div>
        ) : (
          <pre className="leading-loose flex-1">
            <span className="text-blue-400">var</span> style = <span className="text-blue-400">new</span> <span className="text-teal-400">HelpProviderStyle</span>()<br/>
            {'  '}{'{'}<br/>
            {'    '}Usage = <span className="text-blue-400">new</span>()<br/>
            {'    '}{'{'}<br/>
            {'      '}Header = <CodeString path="Usage.Header" />,<br/>
            {'      '}CurrentCommand = <CodeString path="Usage.CurrentCommand" />,<br/>
            {'      '}RequiredArgument = <CodeString path="Usage.RequiredArgument" />,<br/>
            {'      '}OptionalArgument = <CodeString path="Usage.OptionalArgument" />,<br/>
            {'      '}Options = <CodeString path="Usage.Options" />,<br/>
            {'      '}Command = <CodeString path="Usage.Command" />,<br/>
            {'    '}{'}'},<br/>
            <br/>
            {'    '}Description = <span className="text-blue-400">new</span>()<br/>
            {'    '}{'{'}<br/>
            {'      '}Header = <CodeString path="Description.Header" />,<br/>
            {'    '}{'}'},<br/>
            <br/>
            {'    '}Options = <span className="text-blue-400">new</span>()<br/>
            {'    '}{'{'}<br/>
            {'      '}Header = <CodeString path="Options.Header" />,<br/>
            {'      '}RequiredOption = <CodeString path="Options.RequiredOption" />,<br/>
            {'      '}RequiredOptionValue = <CodeString path="Options.RequiredOptionValue" />,<br/>
            {'      '}OptionalOptionValue = <CodeString path="Options.OptionalOptionValue" />,<br/>
            {'      '}DefaultValueHeader = <CodeString path="Options.DefaultValueHeader" />,<br/>
            {'      '}DefaultValue = <CodeString path="Options.DefaultValue" />,<br/>
            {'    '}{'}'},<br/>
            <br/>
            {'    '}Arguments = <span className="text-blue-400">new</span>()<br/>
            {'    '}{'{'}<br/>
            {'      '}Header = <CodeString path="Arguments.Header" />,<br/>
            {'      '}RequiredArgument = <CodeString path="Arguments.RequiredArgument" />,<br/>
            {'      '}OptionalArgument = <CodeString path="Arguments.OptionalArgument" />,<br/>
            {'    '}{'}'},<br/>
            <br/>
            {'    '}Examples = <span className="text-blue-400">new</span>()<br/>
            {'    '}{'{'}<br/>
            {'      '}Header = <CodeString path="Examples.Header" />,<br/>
            {'      '}Arguments = <CodeString path="Examples.Arguments" />,<br/>
            {'    '}{'}'},<br/>
            <br/>
            {'    '}Commands = <span className="text-blue-400">new</span>()<br/>
            {'    '}{'{'}<br/>
            {'      '}Header = <CodeString path="Commands.Header" />,<br/>
            {'      '}ChildCommand = <CodeString path="Commands.ChildCommand" />,<br/>
            {'      '}RequiredArgument = <CodeString path="Commands.RequiredArgument" />,<br/>
            {'    '}{'}'},<br/>
            {'  '}{'}'};
          </pre>
        )}
      </div>

      {/* RIGHT PANE: CLI PREVIEW */}
      <div className="w-1/2 h-full overflow-y-auto bg-[#0c0c0c] p-6 text-gray-200 relative">
        <div className="text-gray-500 mb-4 font-sans text-xs uppercase tracking-wider font-bold">Live CLI Preview</div>
        <div className="whitespace-pre">
          <TermSpan path="Usage.Header">USAGE:</TermSpan>{'\n'}
          {'    app '}<TermSpan path="Usage.CurrentCommand">cmd</TermSpan> <TermSpan path="Usage.RequiredArgument">&lt;REQUIRED&gt;</TermSpan> <TermSpan path="Usage.OptionalArgument">[OPTIONAL]</TermSpan> <TermSpan path="Usage.Options">[OPTIONS]</TermSpan> <TermSpan path="Usage.Command">[COMMAND]</TermSpan>{'\n'}
          {'\n'}
          <TermSpan path="Arguments.Header">ARGUMENTS:</TermSpan>{'\n'}
          {'    '}<TermSpan path="Arguments.RequiredArgument">&lt;REQUIRED&gt;</TermSpan>{'    '}A greeting message to display when the command is executed{'\n'}
          {'    '}<TermSpan path="Arguments.OptionalArgument">[OPTIONAL]</TermSpan>{'    '}The name of the person to greet{'\n'}
          {'\n'}
          <TermSpan path="Options.Header">OPTIONS:</TermSpan>{'\n'}
          {'                                    '}<TermSpan path="Options.DefaultValueHeader">DEFAULT</TermSpan>{'\n'}
          {'    -h, --help                                        '}Prints help information{'\n'}
          {'        --flag                                        '}A flag option{'\n'}
          {'        --optional-option '}<TermSpan path="Options.OptionalOptionValue">[VALUE]</TermSpan>{'    '}<TermSpan path="Options.DefaultValue">default value</TermSpan>{'    '}An optional option{'\n'}
          {'        --required-option '}<TermSpan path="Options.RequiredOptionValue">&lt;VALUE&gt;</TermSpan>{'    '}<TermSpan path="Options.DefaultValue">default value</TermSpan>{'    '}A required option. Required{'\n'}
          {'\n'}
          <TermSpan path="Commands.Header">COMMANDS:</TermSpan>{'\n'}
          {'    '}<TermSpan path="Commands.ChildCommand">command</TermSpan>{'    '}A sub command{'\n'}
        </div>
        <a
          href="https://github.com/WoLfulus/spectre-style-editor"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-[#1c1c1c] hover:bg-[#2a2a2a] border border-gray-700 hover:border-gray-500 rounded text-gray-400 hover:text-gray-200 transition-colors font-sans text-xs"
          title="View on GitHub"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
      </div>

      {/* POPOVER EDITOR */}
      {activeEditor && (
        <div 
          ref={editorRef}
          className="fixed bg-[#252526] border border-[#454545] rounded-md shadow-2xl p-4 z-50 flex flex-col gap-4 font-sans"
          style={{ 
            top: `${Math.min(activeEditor.top, window.innerHeight - 350)}px`, 
            left: `${activeEditor.left}px` 
          }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">
              {activeEditor.keys.length > 1 ? `Editing ${activeEditor.keys.length} values` : activeEditor.primaryKey}
            </span>
            <button onClick={() => setActiveEditor(null)} className="text-gray-400 hover:text-white">✕</button>
          </div>

          {/* Text Style Toggles */}
          <div className="grid grid-cols-4 gap-2">
            <StyleToggle prop="bold" label="Bold" customClass="font-bold" />
            <StyleToggle prop="italic" label="Italic" customClass="italic" />
            <StyleToggle prop="underline" label="Under" customClass="underline" />
            <StyleToggle prop="strikethrough" label="Strike" customClass="line-through" />
            <StyleToggle prop="dim" label="Dim" customClass="opacity-70" />
            <StyleToggle prop="invert" label="Inv" />
            <StyleToggle prop="slowblink" label="Blink" />
            <StyleToggle prop="rapidblink" label="Fast" />
          </div>

          {/* Color Palette */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-xs text-gray-400">Color Palette</span>
              <span className="text-[10px] text-gray-500">{parseStyleString(styles[activeEditor.primaryKey]).color}</span>
            </div>
            <div className="grid grid-cols-8 gap-1 h-48 overflow-y-auto pr-1 pb-1">
              {sortedColors.map(color => (
                <button
                  key={color.name}
                  title={color.name}
                  className={`w-full aspect-square rounded-sm border ${parseStyleString(styles[activeEditor.primaryKey]).color === color.name ? 'border-white scale-110 z-10 shadow-lg' : 'border-transparent hover:scale-110 hover:border-gray-400 transition-transform'}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => updateStyle({ color: color.name })}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
