export const QiAlt = ({
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
        d="M5 9h5.485a1 1 0 0 1 .814.419l9.402 13.162a1 1 0 0 0 .814.419H27M21 9h6"
      />
    </svg>
  )
}
export const QiArrowRight = ({
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
        d="M5 16h21"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m19 8 8 8-8 8"
      />
    </svg>
  )
}
export const QiAttachment = ({
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
        d="m10.49 19.182 7.778-7.778c.976-.976 2.382-1.153 3.359-.177.976.976.8 2.383-.177 3.359 0 0 0 0 0 0l-8.132 8.132c-1.414 1.414-4.243 1.414-6.01-.354-1.768-1.768-1.768-4.596-.354-6.01l8.132-8.132a6.5 6.5 0 0 1 9.192 9.192l-4.596 4.596"
      />
    </svg>
  )
}
export const QiChat = ({
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
        d="M25 7H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h11l6 4v-4h1a4 4 0 0 0 4-4V11a4 4 0 0 0-4-4z"
      />
      <circle cx={9.5} cy={17.5} r={1.5} fill={color} />
      <circle cx={14.5} cy={17.5} r={1.5} fill={color} />
      <circle cx={19.5} cy={17.5} r={1.5} fill={color} />
    </svg>
  )
}
export const QiCheckmarkDouble = ({
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
        d="m4 17 5 5 12-12m-5 10 2 2 12-12"
      />
    </svg>
  )
}
export const QiCheckmark = ({
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
        d="m6.5 17 6 6 13-13"
      />
    </svg>
  )
}
export const QiChevronDown = ({
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
        d="m6 12 10 10 10-10"
      />
    </svg>
  )
}
export const QiChevronLeft = ({
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
        d="M20 6 10 16l10 10"
      />
    </svg>
  )
}
export const QiChevronRight = ({
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
        d="m12 26 10-10L12 6"
      />
    </svg>
  )
}
export const QiCog = ({
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
export const QiCompose = ({
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
        d="M27 5 17 15m0-10H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-9"
      />
    </svg>
  )
}
export const QiDiscard = ({
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
      <circle
        cx={16}
        cy={16}
        r={13}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m9.5 23 13-13.5"
      />
    </svg>
  )
}
export const QiDownload = ({
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
        d="M16 22V5"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m9 16 7 7 7-7M9 27h14"
      />
    </svg>
  )
}
export const QiEscape = ({
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
        d="m8.5 23.5 15-15m0 15-15-15"
      />
    </svg>
  )
}
export const QiEye = ({
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
        d="M29 16c0 3-5.82 9-13 9S3 19 3 16s5.82-9 13-9 13 6 13 9z"
      />
      <circle
        cx={16}
        cy={16}
        r={5}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
export const QiFolderArchive = ({
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
        d="M5 11V7a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v4h-2v14.002A1.999 1.999 0 0 1 23 27H9c-1.105 0-2-.894-2-1.998V11H5z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M6 11h20m-14 5h8"
      />
    </svg>
  )
}
export const QiFolderTrash = ({
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
      <ellipse
        cx={16}
        cy={8}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        rx={11}
        ry={3}
      />
      <path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m5 8 3 18s1 2 8 2 8-2 8-2l3-18"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m18.5 16.5-5 5m0-5 5 5"
      />
    </svg>
  )
}
export const QiForward = ({
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
        d="M17 13S3 13 3 16s14 3 14 3v3.453c0 1.74 2.069 2.65 3.351 1.475l7.04-6.454a2 2 0 0 0 0-2.948l-7.04-6.454C19.07 6.896 17 7.806 17 9.546V13z"
      />
    </svg>
  )
}
export const QiGift = ({
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
        d="M5 11c0-1 1-2 2-2h18c1 0 2 1 2 2v4h-2v10c0 1-1 2-2 2H9c-1 0-2-1-2-2V15H5v-4z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M7 15h18m-9-6v18m0-18c-1.333-2.833-4.1-7.4-6.5-5-2.4 2.4 3 5 6.5 5zm0 0c0-4.5 4.5-7.5 6.5-5.5C25 6 20 9 16 9z"
      />
    </svg>
  )
}
export const QiInbox = ({
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
        strokeMiterlimit={4.62}
        strokeWidth={strokeWidth}
        d="M5 16h5.5s1.5 3.5 5.5 3.5 5.5-3.5 5.5-3.5H27v8c0 1.5-1.5 3-3 3H8c-1.5 0-3-1.5-3-3v-8z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M27 19.5V16L23 5H9L5 16v3.5"
      />
    </svg>
  )
}
export const QiInfo = ({
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
        d="M29 16a13 13 0 1 1-26 0 13 13 0 0 1 26 0h0z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M15 14h1v9h1"
      />
      <path fill={color} d="M17.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  )
}

export const QiJump = ({
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

export const QiLinkOut = ({
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
        d="M22 3h7v7m-1.5-5.5L20 12m-3-7H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h16a3 3 0 0 0 3-3v-9"
      />
    </svg>
  )
}

export const QiMailUnsub = ({
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
        d="M29 16V9c0-1-1-2-2-2H5C4 7 3 8 3 9v14c0 1 1 2 2 2h11"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m3 9 11.862 8.212a2 2 0 0 0 2.276 0L29 9"
      />
      <circle
        cx={24}
        cy={23}
        r={5}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m21 26 6-6"
      />
    </svg>
  )
}
export const QiMail = ({
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
        d="M3 9a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m3 9 11.862 8.212a2 2 0 0 0 2.276 0L29 9"
      />
    </svg>
  )
}
export const QiMeatballsH = ({
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
        fill={color}
        d="M8 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
export const QiReply = ({
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
        d="m5.608 12.526 7.04-6.454C13.931 4.896 16 5.806 16 7.546V11c13 0 11 16 11 16s-4-10-11-10v3.453c0 1.74-2.069 2.65-3.351 1.475l-7.04-6.454a2 2 0 0 1 0-2.948z"
      />
    </svg>
  )
}

export const QiSend = ({
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
        d="M29 3 3 15l12 2.5M29 3 19 29l-4-11.5M29 3 15 17.5"
      />
    </svg>
  )
}
export const QiSearch = ({
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
        d="m28 27-7.5-7.5"
      />
      <circle
        r={9}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        transform="matrix(-1 0 0 1 14 13)"
      />
    </svg>
  )
}
export const QiSignature = ({
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
export const QiSign = ({
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
        r={strokeWidth}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}

export const QiSkip = ({
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
        d="M8 24.414V7.586c0-1.746 2.081-2.653 3.36-1.465l9.062 8.413a2 2 0 0 1 0 2.932l-9.061 8.413C10.08 27.067 8 26.16 8 24.414zM23 5v22"
      />
    </svg>
  )
}
export const QiSort = ({
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
        fill={color}
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

export const QiToDo = ({
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
        d="M29 16a13 13 0 1 1-26 0 13 13 0 0 1 26 0h0z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m11.5 16 3.5 3.5 6-6"
      />
    </svg>
  )
}
export const QiWarningAlt = ({
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
        d="M29 16a13 13 0 1 1-26 0 13 13 0 0 1 26 0h0zm-13 1.5v-8"
      />
      <path fill={color} d="M17.5 22a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  )
}
