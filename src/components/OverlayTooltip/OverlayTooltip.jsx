import { OverlayTrigger, Tooltip } from "react-bootstrap"

const OverlayTooltip = ({ placement, id, children, tooltipText, variant }) => {

  return (
    <OverlayTrigger key={placement}
      placement={placement}
      overlay={
        <Tooltip id={`tooltip-${id}`} className={`${variant && variant}`}>
          {tooltipText}
        </Tooltip>
      }>
      {children}
    </OverlayTrigger>
  )
}
export default OverlayTooltip 