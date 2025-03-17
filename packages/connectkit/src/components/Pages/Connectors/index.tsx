import React, { useMemo, useState } from 'react';
import { useContext, routes } from '../../ConnectKit';

import {
  LearnMoreContainer,
  LearnMoreButton,
  InfoBox,
  InfoBoxButtons,
} from './styles';
import TermsChecks from './terms';
import {
  PageContent,
  Disclaimer,
  ModalContent,
  ModalH1,
  ModalBody,
} from '../../Common/Modal/styles';
import WalletIcon from '../../../assets/wallet';

import useLocales from '../../../hooks/useLocales';
import ConnectorList from '../../Common/ConnectorList';
import useIsMobile from '../../../hooks/useIsMobile';
import Button from '../../Common/Button';

const Wallets: React.FC = () => {
  const context = useContext();
  const locales = useLocales({});

  const isMobile = useIsMobile();

  const [termsAccepted, setTermsAccepted] = useState(
    context.options?.terms ? context.options?.terms.map((_) => false) : []
  );
  const allAccepted = useMemo(
    () => termsAccepted.every((t) => t === true),
    [termsAccepted]
  );

  return (
    <PageContent style={{ width: 312 }}>
      {context.options?.terms && context.options?.terms.length > 0 && (
        <TermsChecks
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
        />
      )}

      <div
        style={
          context.options?.terms?.length === 0 || allAccepted
            ? {}
            : { opacity: 0.5, pointerEvents: 'none' }
        }
      >
        <ConnectorList />
      </div>

      {isMobile ? (
        <>
          <InfoBox>
            <ModalContent style={{ padding: 0, textAlign: 'left' }}>
              <ModalH1 $small>{locales.connectorsScreen_h1}</ModalH1>
              <ModalBody>{locales.connectorsScreen_p}</ModalBody>
            </ModalContent>
            <InfoBoxButtons>
              {!context.options?.hideQuestionMarkCTA && (
                <Button
                  variant={'tertiary'}
                  onClick={() => context.setRoute(routes.ABOUT)}
                >
                  {locales.learnMore}
                </Button>
              )}
              {!context.options?.hideNoWalletCTA && (
                <Button
                  variant={'tertiary'}
                  onClick={() => context.setRoute(routes.ONBOARDING)}
                >
                  {locales.getWallet}
                </Button>
              )}
            </InfoBoxButtons>
          </InfoBox>
        </>
      ) : (
        <>
          {!context.options?.hideNoWalletCTA && (
            <LearnMoreContainer>
              <LearnMoreButton
                onClick={() => context.setRoute(routes.ONBOARDING)}
              >
                <WalletIcon /> {locales.connectorsScreen_newcomer}
              </LearnMoreButton>
            </LearnMoreContainer>
          )}
        </>
      )}
      {context.options?.disclaimer && (
        <Disclaimer style={{ visibility: 'hidden', pointerEvents: 'none' }}>
          <div>{context.options?.disclaimer}</div>
        </Disclaimer>
      )}
    </PageContent>
  );
};

export default Wallets;
