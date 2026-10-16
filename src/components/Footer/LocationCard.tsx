import { useT } from '../../i18n'
import { mailtoHref, mapHref, telHref } from '../../lib/links'
import { ContactLink, FLAG_LABEL, PlaceholderText } from '../ContactLink'
import { ArrowUpRightIcon, ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '../icons'
import type { Location } from './locations'

const ROW = 'grid grid-cols-[1.25rem_minmax(0,1fr)] gap-x-3' // 20px icon track: every value aligns
const VALUE = 'inline-flex min-h-11 items-center rounded-sm wrap-anywhere'
const LINK = 'text-white/85 transition-colors hover:text-accent-300 motion-reduce:transition-none'

/** One office: h3, <address> with a <dl> of phone/email/hours, and a placeholder-aware map link. */
export function LocationCard({ location: loc, newTabId }: { location: Location; newTabId: string }) {
  const { t, lang } = useT()
  const address = loc.address[lang]
  const hours = loc.hours?.[lang]
  const titleId = `footer-${loc.id}-title`
  const mapId = `footer-${loc.id}-map`

  return (
    <div className="flex min-w-0 flex-col border-t border-white/15 pt-6">
      <h3 id={titleId} className="flex items-center gap-3 text-h3 font-bold text-white">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-xs bg-accent-300 shadow-glow" />
        {t(loc.titleKey)}
      </h3>

      {/* The h3 stays outside <address>: address must not contain headings. */}
      <address className="mt-4 not-italic">
        <p className={`${ROW} items-start`}>
          <MapPinIcon className="mt-0.5 text-accent-300" />
          <PlaceholderText value={address} className="whitespace-pre-line wrap-break-word">
            {t(loc.addressKey, { address })}
          </PlaceholderText>
        </p>
        <dl className="mt-2">
          <div className={`${ROW} items-center`}>
            <dt>
              <PhoneIcon className="text-accent-300" />
              <span className="sr-only">{t('footer.phone')}</span>
            </dt>
            {loc.phones.map((p) => (
              <dd key={p.value} className="col-start-2">
                <ContactLink href={telHref(p.value, p.override)} className={VALUE} linkClassName={LINK}>
                  {p.value}
                </ContactLink>
              </dd>
            ))}
          </div>
          <div className={`${ROW} items-center`}>
            <dt>
              <MailIcon className="text-accent-300" />
              <span className="sr-only">{t('footer.email')}</span>
            </dt>
            <dd>
              <ContactLink href={mailtoHref(loc.email)} className={VALUE} linkClassName={LINK}>
                {loc.email}
              </ContactLink>
            </dd>
          </div>
          {hours && (
            <div className={`${ROW} items-center`}>
              <dt>
                <ClockIcon className="text-accent-300" />
                <span className="sr-only">{t('footer.hours')}</span>
              </dt>
              <dd className="flex min-h-11 items-center">
                <PlaceholderText value={hours}>{hours}</PlaceholderText>
              </dd>
            </div>
          )}
        </dl>
      </address>

      {/* mt-auto: grid siblings stretch to equal height, so the map link sits at the bottom. */}
      <p className="mt-auto pt-4">
        <ContactLink
          href={mapHref(address, loc.mapUrl)}
          external
          labelledBy={`${mapId} ${titleId}`}
          describedBy={newTabId}
          className="inline-flex min-h-11 items-center gap-2 rounded-sm font-semibold"
          linkClassName="text-accent-300 transition-colors hover:text-white motion-reduce:transition-none"
          placeholderClassName={FLAG_LABEL}
        >
          <span id={mapId}>{t('footer.map')}</span>
          <ArrowUpRightIcon width={16} height={16} />
        </ContactLink>
      </p>
    </div>
  )
}
