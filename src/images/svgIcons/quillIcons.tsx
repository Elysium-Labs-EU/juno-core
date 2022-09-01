export const Cog = ({
  size = 0,
  color = 'currentColor',
  strokeWidth = 2,
}: {
  size?: number
  color?: string
  strokeWidth?: number
}) => {
  const preserveAspectRatio = 'xMidYMid meet'
  const width = size === 0 ? '1em' : size
  const height = size === 0 ? '1em' : size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      preserveAspectRatio={preserveAspectRatio}
    >
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M13.905 3.379A.5.5 0 0 1 14.39 3h3.22a.5.5 0 0 1 .485.379l.689 2.757a.515.515 0 0 0 .341.362c.383.126.755.274 1.115.443a.515.515 0 0 0 .449-.003l2.767-1.383a.5.5 0 0 1 .577.093l2.319 2.319a.5.5 0 0 1 .093.577l-1.383 2.767a.515.515 0 0 0-.003.449c.127.271.243.549.346.833.053.148.17.265.319.315l2.934.978a.5.5 0 0 1 .342.474v3.28a.5.5 0 0 1-.342.474l-2.934.978a.515.515 0 0 0-.32.315 9.937 9.937 0 0 1-.345.833.515.515 0 0 0 .003.449l1.383 2.767a.5.5 0 0 1-.093.577l-2.319 2.319a.5.5 0 0 1-.577.093l-2.767-1.383a.515.515 0 0 0-.449-.003 9.994 9.994 0 0 1-.833.346.515.515 0 0 0-.315.319l-.978 2.934a.5.5 0 0 1-.474.342h-3.28a.5.5 0 0 1-.474-.342l-.978-2.934a.515.515 0 0 0-.315-.32 9.95 9.95 0 0 1-1.101-.475.515.515 0 0 0-.498.014l-2.437 1.463a.5.5 0 0 1-.611-.075l-2.277-2.277a.5.5 0 0 1-.075-.61l1.463-2.438a.515.515 0 0 0 .014-.498 9.938 9.938 0 0 1-.573-1.383.515.515 0 0 0-.362-.341l-2.757-.69A.5.5 0 0 1 3 17.61v-3.22a.5.5 0 0 1 .379-.485l2.757-.689a.515.515 0 0 0 .362-.341c.157-.478.35-.94.573-1.383a.515.515 0 0 0-.014-.498L5.594 8.557a.5.5 0 0 1 .075-.611l2.277-2.277a.5.5 0 0 1 .61-.075l2.438 1.463c.152.091.34.094.498.014a9.938 9.938 0 0 1 1.382-.573.515.515 0 0 0 .342-.362l.69-2.757z"
      />
      <circle
        cx={16}
        cy={16}
        r={5}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const Jump = ({
  size = 0,
  color = 'currentColor',
  strokeWidth = 2,
}: {
  size?: number
  color?: string
  strokeWidth?: number
}) => {
  const preserveAspectRatio = 'xMidYMid meet'
  const width = size === 0 ? '1em' : size
  const height = size === 0 ? '1em' : size
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      preserveAspectRatio={preserveAspectRatio}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        d="M26.622 5.17c.096-.043.184.072.119.154l-7.355 9.193a.5.5 0 0 0 .167.76l3.563 1.781a1 1 0 0 1-.037 1.806L5.38 26.83c-.097.043-.186-.072-.12-.154l7.355-9.193a.5.5 0 0 0-.167-.76l-3.563-1.781a1 1 0 0 1 .037-1.806l17.7-7.966z"
      />
    </svg>
  )
}

export const Signature = ({
  size = 0,
  color = 'currentColor',
  strokeWidth = 2,
}: {
  size?: number
  color?: string
  strokeWidth?: number
}) => {
  const preserveAspectRatio = 'xMidYMid meet'
  const width = size === 0 ? '1em' : size
  const height = size === 0 ? '1em' : size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      preserveAspectRatio={preserveAspectRatio}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M3 27C6 19.333 13.5 5 18.5 5 23 5 10 26 15 26c3.5 0 6-10.5 8.5-10.5s-1 9 1 9c2.5 0 4-4 4-4"
      />
    </svg>
  )
}
export const Sign = ({
  size = 0,
  color = 'currentColor',
  strokeWidth = 2,
}: {
  size?: number
  color?: string
  strokeWidth?: number
}) => {
  const preserveAspectRatio = 'xMidYMid meet'
  const width = size === 0 ? '1em' : size
  const height = size === 0 ? '1em' : size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      preserveAspectRatio={preserveAspectRatio}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M19 3h-6c0 8-4 11.333-6 12l4 10h10l4-10c-2-.833-6-4.4-6-12zm4 22H9v4h14v-4zm-7-6v6m0-12V3"
      />
      <circle
        cx={16}
        cy={16}
        r={2}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const Sort = ({
  size = 0,
  color = 'currentColor',
  strokeWidth = 2,
}: {
  size?: number
  color?: string
  strokeWidth?: number
}) => {
  const preserveAspectRatio = 'xMidYMid meet'
  const width = size === 0 ? '1em' : size
  const height = size === 0 ? '1em' : size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 32 32"
      preserveAspectRatio={preserveAspectRatio}
    >
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M9 25v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-3"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m8.201 9.85 3.95-.626M9.14 15.776l9.877-1.564m-9.252 5.515 7.902-1.252"
      />
      <circle
        cx={18.078}
        cy={8.286}
        r={1}
        fill="#535358"
        transform="rotate(-9 18.078 8.286)"
      />
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M3.781 7.513a2 2 0 0 1 1.663-2.289l13.827-2.19a2 2 0 0 1 2.288 1.663l2.66 16.79a2 2 0 0 1-1.663 2.289L8.73 25.966a2 2 0 0 1-2.289-1.663l-2.66-16.79z"
      />
    </svg>
  )
}
