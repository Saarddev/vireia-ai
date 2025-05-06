
import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';
import EditableField from './EditableField';

interface ContactInfoProps {
  personal: any;
  onUpdateData?: (section: string, value: any) => void;
  onGenerateWithAI?: (section: string) => Promise<string>;
  compact?: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ 
  personal, 
  onUpdateData, 
  onGenerateWithAI,
  compact = false
}) => {
  const contactFieldClass = `inline px-1 py-0 rounded bg-transparent border-none ${compact ? 'text-xs' : 'text-sm'} focus:bg-gray-100 text-gray-700 min-w-[60px] max-w-[180px]`;
  const contactDivider = <span className="mx-1 text-gray-400">|</span>;

  const isValidUrl = (urlString: string): boolean => {
    try {
      if (!urlString || urlString.trim() === '') return false;
      const urlToTest = urlString.match(/^https?:\/\//) ? urlString : `https://${urlString}`;
      new URL(urlToTest);
      return true;
    } catch (e) {
      return false;
    }
  };

  const getDisplayUrl = (url: string): string => {
    try {
      if (!isValidUrl(url)) return url;
      const urlWithProtocol = url.match(/^https?:\/\//) ? url : `https://${url}`;
      return new URL(urlWithProtocol).hostname;
    } catch (e) {
      return url;
    }
  };

  const formatLink = (url: string): string => {
    if (!url) return '';
    return url.match(/^https?:\/\//) ? url : `https://${url}`;
  };

  const contactItems = [{
    key: 'email',
    value: personal.email,
    placeholder: "john.smith@example.com",
    ai: "personal-email",
    icon: <Mail className={`${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />,
    link: personal.email ? `mailto:${personal.email}` : ''
  }, {
    key: 'phone',
    value: personal.phone,
    placeholder: "(555) 123-4567",
    ai: "personal-phone",
    icon: <Phone className={`${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />,
    link: personal.phone ? `tel:${personal.phone}` : ''
  }, {
    key: 'location',
    value: personal.location,
    placeholder: "San Francisco, CA",
    ai: "personal-location",
    icon: <MapPin className={`${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />
  }, ...(personal.linkedin ? [{
    key: 'linkedin',
    value: "LinkedIn",
    placeholder: "linkedin.com/in/johnsmith",
    ai: "personal-linkedin",
    icon: <Linkedin className={`${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />,
    link: personal.linkedin ? formatLink(
      personal.linkedin.includes('linkedin.com') ? 
      personal.linkedin : 
      `https://www.linkedin.com/in/${personal.linkedin}`
    ) : ''
  }] : []), ...(personal.website && isValidUrl(personal.website) ? [{
    key: 'website',
    value: getDisplayUrl(personal.website),
    placeholder: "johnsmith.dev",
    ai: "personal-website",
    icon: <LinkIcon className={`${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} mr-1`} />,
    link: formatLink(personal.website)
  }] : [])];

  return (
    <div className={`flex flex-wrap ${compact ? 'text-xs' : 'text-sm'} text-gray-700 mt-2 ${compact ? 'gap-x-1' : 'gap-x-2'} gap-y-1 items-center print:flex-row print:gap-x-2 print:gap-y-0 justify-center`}>
      {contactItems.map((item, idx) => (
        <React.Fragment key={item.key}>
          {idx > 0 && contactDivider}
          <div className="inline-flex items-center">
            {item.icon}
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5d4dcd] transition-colors"
              >
                <EditableField
                  value={item.value}
                  placeholder={item.placeholder}
                  className={contactFieldClass}
                  onSave={val => onUpdateData?.("personal", { 
                    ...personal, 
                    [item.key]: item.key === 'linkedin' || item.key === 'website' 
                      ? val 
                      : item.key === 'email' || item.key === 'phone' ? val : personal[item.key]
                  })}
                  onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(item.ai) : undefined}
                  minRows={1}
                  maxRows={1}
                />
              </a>
            ) : (
              <EditableField
                value={item.value}
                placeholder={item.placeholder}
                className={contactFieldClass}
                onSave={val => onUpdateData?.("personal", { ...personal, [item.key]: val })}
                onGenerateWithAI={onGenerateWithAI ? () => onGenerateWithAI(item.ai) : undefined}
                minRows={1}
                maxRows={1}
              />
            )}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default ContactInfo;
