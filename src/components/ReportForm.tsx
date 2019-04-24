import React, { useState } from "react";
import Mascot, { MascotColor } from "./Mascot";
import {
  Screen,
  Header,
  Content,
  Title,
  MascotPosition,
  Close,
  Button,
  Input,
  ErrorMessage
} from "../global.styles";
import * as S from "./ReportForm.styles";

interface Props {
  onClose: () => void;
}

function ReportForm({ onClose }: Props): JSX.Element {
  const [domain, setDomain] = useState("");
  const [notes, setNotes] = useState("");
  const [reasons, setReasons] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onFormSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    // crude spam protection
    if (domain === "" || domain.indexOf(".") === -1) {
      setError("Please enter a domain name.");
      return;
    }

    try {
      setSubmitting(true);
      const result = await fetch("https://betterweb-api.shaun.church/reports", {
        method: "POST",
        body: JSON.stringify({
          url: domain,
          notes,
          reasons
        })
      });

      if (result.ok) {
        setSuccess(true);
        setSubmitting(false);
      } else {
        setSuccess(false);
        setSubmitting(false);
      }
    } catch (e) {
      setError("Sorry, there was a problem submitting your report.");
      setSubmitting(false);
      console.error(e);
    }
  };

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value, id } = e.currentTarget;
    switch (id) {
      case "domain":
        setDomain(value);
        break;
      case "notes":
        setNotes(value);
    }
  };

  const handleCheck = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const { value, checked } = e.currentTarget;
    if (checked) {
      // add
      setReasons([...reasons, value]);
    } else {
      // remove
      setReasons(reasons.filter((reason: string): boolean => reason !== value));
    }
  };

  return (
    <Screen>
      <Close onClick={onClose}>X</Close>
      <Header>
        <MascotPosition>
          <Mascot color={success ? MascotColor.Green : MascotColor.Red} />
        </MascotPosition>
        <Content>
          {success ? (
            <div>
              <Title>Thanks</Title>
              <p>Thanks for the info. We'll add it to the list.</p>
            </div>
          ) : null}

          {!success ? (
            <form onSubmit={onFormSubmit}>
              <Title>Add site</Title>
              <S.Label htmlFor="domain" placeholder="website.com">
                Domain
              </S.Label>
              <Input
                type="text"
                id="domain"
                aria-required="true"
                onChange={handleChange}
              />

              <S.Label htmlFor="reason">Reason</S.Label>
              <S.ReasonList>
                <li>
                  <input
                    id="reason-1"
                    type="checkbox"
                    value="recVhPo75nuEtkF9H"
                    onChange={handleCheck}
                  />
                  <label htmlFor="reason-1">Bad faith privacy notice</label>
                </li>
                <li>
                  <input
                    id="reason-6"
                    type="checkbox"
                    value="recpx3PKqzuPRaxVf"
                    onChange={handleCheck}
                  />
                  <label htmlFor="reason-6">Behind paywall</label>
                </li>
                <li>
                  <input
                    id="reason-5"
                    type="checkbox"
                    value="recxBfnWAU61wQ0Kk"
                    onChange={handleCheck}
                  />
                  <label htmlFor="reason-5">No European access</label>
                </li>
                <li>
                  <input
                    id="reason-2"
                    type="checkbox"
                    value="recO5pRUWbvqdTu5h"
                    onChange={handleCheck}
                  />
                  <label htmlFor="reason-2">Newsletter popup</label>
                </li>
                <li>
                  <input
                    id="reason-3"
                    type="checkbox"
                    value="rec2wiL11eRR4fflv"
                    onChange={handleCheck}
                  />
                  <label htmlFor="reason-3">Notification request</label>
                </li>
                <li>
                  <input
                    id="reason-4"
                    type="checkbox"
                    value="reci6wGgPYtPjNo6l"
                    onChange={handleCheck}
                  />
                  <label htmlFor="reason-4">
                    Excessive popups and overlays
                  </label>
                </li>
              </S.ReasonList>

              <S.Label htmlFor="notes">
                Notes <small>(optional)</small>
              </S.Label>
              <Input
                type="text"
                placeholder="Notes..."
                id="notes"
                aria-required="false"
                onChange={handleChange}
              />
              <p />

              {error ? <ErrorMessage>{error}</ErrorMessage> : null}

              <Button type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send report"}
              </Button>
            </form>
          ) : null}
        </Content>
      </Header>
    </Screen>
  );
}

export default ReportForm;
