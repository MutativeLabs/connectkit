import React, { useCallback } from 'react';
import { useContext } from '../../ConnectKit';

import { TermsWrapper, Terms, TermsCheckbox } from '../../Common/Modal/styles';

interface TermsCheckedProps {
  termsAccepted: boolean[];
  setTermsAccepted: (newTermsAccepted: boolean[]) => void;
}

const TermsChecks: React.FC<TermsCheckedProps> = ({
  termsAccepted,
  setTermsAccepted,
}) => {
  const context = useContext();

  const handleChange = useCallback(
    (index: number) => {
      const tmpTerms = [...termsAccepted];
      tmpTerms[index] = !termsAccepted[index];
      setTermsAccepted(tmpTerms);
    },
    [termsAccepted]
  );

  return (
    <TermsWrapper>
      {context.options?.terms?.map((t, index) => (
        <Terms key={`terms-${index}`} whileTap="tap" whileHover="hover">
          <TermsCheckbox
            initial={{ scale: 1 }}
            variants={{ tap: { scale: 0.9 }, hover: { scale: 1.2 } }}
            checked={termsAccepted[index]}
            onChange={() => handleChange(index)}
            id={`terms-${index}`}
            name={`terms-${index}`}
          />
          <label
            htmlFor={`terms-${index}`}
            style={{
              paddingLeft: '8px',
              cursor: 'pointer',
              width: '100%',
              userSelect: 'none',
            }}
          >
            {t}
          </label>
        </Terms>
      ))}
    </TermsWrapper>
  );
};

export default TermsChecks;
