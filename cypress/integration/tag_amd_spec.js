describe('Tag AMD', () => {
    context('Typing in a tagified input', () => {
        beforeEach(() => {
            cy.visit('/?test=typing');
        });

        it('should create a new tag when a comma is typed', () => {
            let tagValue = 'tag1';
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(tagValue).type(',');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('.tags .tag').should('have.contain', tagValue);
        });

        it('should not duplicate tag', () => {
            let tagValue = 'tag1';
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(tagValue).type(',');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('#tags').type(tagValue).type(',');
            cy.get('.tags .tag').should('have.length', 1);
        });

        it('should create a new tag when enter is typed', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type('newtag1').type('{enter}');
            cy.get('.tags .tag').should('have.length', 1);
        });

        it('should not try to add tags when enter is typed and no text is present in the input', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(' {enter}');
            cy.get('.tags .tag').should('have.length', 0);
        });

        it('should not select or remove last tag when has text and backspace is typed', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type('tag1, tag2,');
            cy.get('.tags .tag').should('have.length', 2);
            cy.get('#tags').type('another-tag');
            cy.get('#tags').type('{backspace}');
            cy.get('.tags .tag').should('not.have.class', 'selected');
            cy.get('.tags .tag').should('have.length', 2);
        });

        it('should do nothing when backspace is typed and there are no tags', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(' {backspace}');
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('.tags .tag').should('not.have.class', 'selected');
        });

        it('should do nothing when left arrow is typed and there are no tags', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(' {leftarrow}');
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('.tags .tag').should('not.have.class', 'selected');
        });

        it('should add all tags in the input when comma is typed', () => {
            let tagValues = 'tag1, another tag, yet another';
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').invoke('val', tagValues).trigger('change');
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(',');
            cy.get('.tags .tag').should('have.length', 3);
        });

        it('should add all unique tags in the input when comma is typed and there are repeated tags', () => {
            let tagValues = 'tag1, another tag, tag1, yet another';
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').invoke('val', tagValues).trigger('change');
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(',');
            cy.get('.tags .tag').should('have.length', 3);
        });

        it('should add tag when key and comma is typed', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type('tag1');
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(',');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('#tags').type('A');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('#tags').type(',');
            cy.get('.tags .tag').should('have.length', 2);
        });
    });

    context('Selecting tags of a tagified input', () => {
        beforeEach(() => {
            cy.visit('/?test=selecting');
        });

        it('should have no selected tags after activated', () => {
            cy.get('#tags').type('tag1').type(',').type('tag-to-remove').type('{enter}');
            cy.get('.tags .tag').should('have.length', 2);
            cy.get('.tags .tag.selected').should('have.length', 0);
        });

        it('should not select tags when pressing left key if input is filled', () => {
            cy.get('#tags').type('tag1').type(',').type('another').type('{enter}');
            cy.get('#tags').type('x').type('{leftarrow}').type('{leftarrow}');
            cy.get('.tags .tag.selected').should('have.length', 0);
        });

        it('should not select tags when pressing right key if input is filled', () => {
            cy.get('#tags').type('tag1, tag-to-remove{enter}');
            cy.get('#tags').type('{rightarrow}');
            cy.get('.tags .tag.selected').should('have.length', 0);
        });

        it('should select the last tag when pressing left key if input is empty', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('.tags .tag.selected').should('have.length', 0);
            cy.get('#tags').type('{leftarrow}');
            cy.get('.tags .tag.selected').should('have.length', 1);
            cy.get('.tags .tag.selected').should('have.contain', 'another');
        });

        it('should select the last tag and not remove it when pressing backspace key if input is empty', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('#tags').type('{enter}');
            cy.get('.tags .tag.selected').should('have.length', 0);
            cy.get('#tags').type('{backspace}');
            cy.get('.tags .tag.selected').should('have.length', 1);
            cy.get('.tags .tag.selected').should('have.contain', 'another');
            cy.get('.tags .tag').should('have.length', 2);
        });

        it('should select the tag before when pressing left key with a tag selected', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('#tags').type('{enter}');
            cy.get('.tags .tag.selected').should('have.length', 0);
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('.tags .tag.selected').should('have.length', 1);
            cy.get('.tags .tag.selected').should('have.contain', 'tag1');
        });

        it('should keep the first tag selected when pressing left key with the first tag selected', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('#tags').type('{enter}');
            cy.get('.tags .tag.selected').should('have.length', 0);
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('.tags .tag.selected').should('have.length', 1);
            cy.get('.tags .tag.selected').should('have.contain', 'tag1');
        });

        it('should deselect the last tag if it was previously selected when the right key is pressed', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{rightarrow}');
            cy.get('.tags .tag.selected').should('have.length', 0);
        });

        it('should select the next tag when the right key is pressed and there is next tag', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{rightarrow}');
            cy.get('.tags .tag.selected').should('have.contain', 'another');
        });

        it('should remove tag when close button was clicked', () => {
            cy.get('#tags').type('tag1, another{enter}');
            cy.get('.tags .tag:first-child .close').click();
            cy.get('.tags .tag').should('have.length', 1);
        });
    });

    context('When tagging', () => {
        beforeEach(() => {
            cy.visit('/?test=when_tagging');
        });

        it('should add a new li with tag as value', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type('tag{enter}');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('input[value="tag"]').should('have.value', 'tag');
        });

        it('should add a another li with another tag as value', () => {
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type('tag, another-tag,');
            cy.get('.tags .tag').should('have.length', 2);
            cy.get('input[value="tag"]').should('have.value', 'tag');
            cy.get('input[value="another-tag"]').should('have.value', 'another-tag');
        });

        it('should add an error class when trying to add repeated tag', () => {
            cy.get('#tags').type('tag');
            cy.get('.tags .tag').should('have.length', 0);
            cy.get('#tags').type(',');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('#tags').type('tag');
            cy.get('#tags').type(',');
            cy.get('#tags').should('have.class', 'error');
            cy.get('.tags .tag').should('have.length', 1);
        });

        it('should remove error class when trying to add repeated tag and typing another letter', () => {
            cy.get('#tags').type('tag{enter}');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('#tags').type('tag{enter}');
            cy.get('#tags').type(',');
            cy.get('#tags').should('have.class', 'error');
            cy.get('#tags').type('A');
            cy.get('#tags').should('not.have.class', 'error');
        });

        it('should focus on second tag when typing left arrow key', () => {
            cy.get('#tags').type('tag1, tag2{enter}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('.tags .tag.selected').should('have.contain', 'tag2');
            cy.get('.tags .tag.selected input').should('have.value', 'tag2');
        });

        it('should focus on first tag when typing left arrow key two times', () => {
            cy.get('#tags').type('tag1, tag2{enter}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('.tags .tag.selected').should('have.contain', 'tag1');
            cy.get('.tags .tag.selected input').should('have.value', 'tag1');
        });

        it('should remove first tag when typing left arrow key two times and pressing backspace', () => {
            cy.get('#tags').type('tag1, tag2');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{backspace}');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('input[value="tag1"]').should('be.exist');
            cy.get('input[value="tag2"]').should('not.exist');
        });

        it('should remove first tag when typing left arrow key two times and pressing delete', () => {
            cy.get('#tags').type('tag1, tag2');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{leftarrow}');
            cy.get('#tags').type('{del}');
            cy.get('.tags .tag').should('have.length', 1);
            cy.get('input[value="tag1"]').should('be.exist');
            cy.get('input[value="tag2"]').should('not.exist');
        });

        it('should not add empty tag', () => {
            cy.get('#tags').type(' ');
            cy.get('#tags').type('{enter}');
            cy.get('.tags .tag').should('have.length', 0);
        });

        it('should focus tag field if last tag is selected and right key is pressed', () => {
            cy.get('#tags').type('tag{enter}');
            cy.get('.tags .tag').click();
            cy.get('.tags .tag').should('have.class', 'selected');
            cy.get('#tags').type('{rightarrow}');
            cy.get('.tags .tag').should('not.have.class', 'selected');
            cy.focused().should('have.attr', 'name', 'tags-name');
        });
    });

    context('Validation', () => {
        beforeEach(() => {
            cy.visit('/?test=when_tagging');
        });

        describe('At startup', () => {
            it('should not trigger error if field is required and there are no tags', () => {
                cy.get('#tags').should('not.have.class', 'error');
            });
        });

        describe('Updating required attribute', () => {
            it('should keep required attribute when activating without tags', () => {
                cy.get('#tags').type('{enter}');
                cy.get('#tags').invoke('attr', 'required', 'required');
                cy.get('#tags').should('have.id', 'tags').and('have.value.length', 0);
            });

            it('should keep required attribute when typing without tags', () => {
                cy.get('#tags').type('{enter}');
                cy.get('#tags').type('A');
                cy.get('#tags').invoke('attr', 'required', 'required');
                cy.get('#tags').should('have.attr', 'required').and('have.value.length', 0);
            });

            it('should remove required attribute when add tag', () => {
                cy.get('#tags').invoke('attr', 'required', 'required');
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').should('not.have.attr', 'required').and('have.value.length', 0);
            });

            it('should remove required attribute after typing first tag', () => {
                cy.get('#tags').invoke('attr', 'required', 'required');
                cy.get('#tags').type('{enter}');
                cy.get('#tags').type('A,');
                cy.get('#tags').should('not.have.attr', 'required').and('have.value.length', 0);
            });

            it('should restore required attribute after erasing last tag', () => {
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').invoke('attr', 'required', 'required');
                cy.get('#tags').type('{backspace}{backspace}');
                cy.get('#tags').should('have.attr', 'required');
            });

            it('should not restore required attribute if there are still tags after erasing a tag', () => {
                cy.get('#tags').invoke('attr', 'required', 'required');
                cy.get('#tags').type('tag1, tag2{enter}');
                cy.get('#tags').type('{backspace}{backspace}');
                cy.get('#tags').should('not.have.attr', 'required');
            });

            it('should not put required attribute after erasing last tag if the input was not required', () => {
                cy.get('#tags').invoke('removeAttr', 'required');
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').type('{backspace}{backspace}');
                cy.get('#tags').should('not.have.attr', 'required');
            });
        });

        describe('Updating maxlength', () => {
            it('should not update maxlength after adding a tag if maxlength is not present', () => {
                cy.get('#tags').should('not.have.attr', 'maxlength');
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').should('not.have.attr', 'maxlength');
            });

            it('should update maxlength accounting for the separator after adding a single tag if maxlength is present', () => {
                cy.get('#tags').invoke('attr', 'maxlength', '200');
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', '196');
            });

            it('should update maxlength after adding a second tag if maxlength is present', () => {
                let tag1 = 'tag1',
                    tag2 = 'tag2',
                    separatorLength = 1,
                    initialMaxlength = 200,
                    finalMaxlength = initialMaxlength - tag1.length - separatorLength - tag2.length - separatorLength;
                cy.get('#tags').invoke('attr', 'maxlength', '200');
                cy.get('#tags').type(`${tag1}{enter}`);
                cy.get('#tags').type(`${tag2},`);
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', `${finalMaxlength}`);
            });

            it('should not allow negative values for maxlength when adding tags', () => {
                cy.get('#tags').invoke('attr', 'maxlength', '20');
                cy.get('#tags').type('senhoru,vasco,thiago{enter}');
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', '0');
            });

            it('should update maxlength consistently after reaching maxlength', () => {
                cy.get('#tags').invoke('attr', 'maxlength', '20');
                cy.get('#tags').type('senhoru,vasco,thiago{enter}');
                cy.get('#tags').type('{backspace}{backspace}'); // remove first
                cy.get('#tags').type('{backspace}{backspace}'); // remove second
                cy.get('#tags').type('{backspace}{backspace}'); // remove third
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', '20');
            });

            it('should update maxlength consistently after missing maxlength by one', () => {
                cy.get('#tags').invoke('attr', 'maxlength', '20');
                cy.get('#tags').type('senhoru,vasco,thiago{enter}');
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', '0');
                cy.get('#tags').type('{backspace}{backspace}'); // remove first
                cy.get('#tags').type('{backspace}{backspace}'); // remove second
                cy.get('#tags').type('{backspace}{backspace}'); // remove third
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', '20');
            });

            it('should not update maxlength after removing a tag if maxlength is not present', () => {
                cy.get('#tags').should('not.have.attr', 'maxlength');
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').type('{backspace}{backspace}');
                cy.get('#tags').should('not.have.attr', 'maxlength');
            });

            it('should update maxlength after removing last tag if maxlength is present', () => {
                cy.get('#tags').invoke('attr', 'maxlength', '200');
                cy.get('#tags').type('tag{enter}');
                cy.get('#tags').type('{backspace}{backspace}');
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', '200');
            });

            it('should update maxlength after removing not the last tag if maxlength is present', () => {
                var tag1 = 'tag1',
                    tag2 = 'tag2',
                    separator = ',',
                    initialMaxlength = 200,
                    intermediateMaxlength = initialMaxlength - tag1.length - separator.length - tag2.length - separator.length,
                    finalMaxlength = initialMaxlength - tag1.length - separator.length;

                cy.get('#tags').invoke('attr', 'maxlength', `${initialMaxlength}`);
                cy.get('#tags').type(`${tag1}${separator}${tag2}{enter}`);
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', `${intermediateMaxlength}`);
                cy.get('#tags').type('{backspace}{backspace}');
                cy.get('#tags').should('have.attr', 'maxlength').and('eq', `${finalMaxlength}`);
            });
        });
    });

    context('Callbacks', () => {
        let tag = null,
            errorCalled = false,
            callback = {},
            win = null

        beforeEach(() => {
            cy.visit('/?test=callbacks');
            cy.window().then((w) => win = w);
        });

        afterEach(() => {
            tag = null,
            errorCalled = false,
            callback = {},
            win = null;
        });

        it('should call errorCleared callback with input as argument when removing error class', () => {
            callback.errorCleared = (param) => {
                expect(errorCalled).to.be.false;
                errorCalled = true;
                expect(errorCalled).to.be.true;
                expect(callback.errorCleared).to.always.be.calledWith(param);
            };
            cy.spy(callback, 'errorCleared');
            cy.get('#tags').type('tag').type('{enter}');
            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('tag').type(',').type('A');
        });

        it('should call errorAlreadyExists callback with input as argument when adding error class', () => {
            callback.errorAlreadyExists = (param) => {
                expect(errorCalled).to.be.false;
                errorCalled = true;
                expect(errorCalled).to.be.true;
                expect(callback.errorAlreadyExists).to.always.be.calledWith(param);
            };
            cy.spy(callback, 'errorAlreadyExists');

            cy.get('#tags').type('tag{enter}');
            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.be.called;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('tag').type('{enter}');
        });

        it('should not call errorAlreadyExists callback when adding a tag', () => {
            callback.errorAlreadyExists = () => {
                expect(callback.errorAlreadyExists).not.to.be.called;
            };
            cy.spy(callback, 'errorAlreadyExists');

            cy.get('#tags').type('tag1{enter}');
            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.be.called;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('tag2').type(',');
        });

        it('should not call added callback when adding error class', () => {
            let calls = 0;
            callback.added = () => {
                expect(calls).to.be.lessThan(2);
            };
            cy.spy(callback, 'added');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('tag').type('{enter}').type('tag').type(',');
        });

        it('should call added callback with new tags as argument when adding a tag', () => {
            callback.added = (param) => {
                expect(callback.added).to.have.calledWith(param);
            };
            cy.spy(callback, 'added');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('tag1').type(',').type(',').type('tag2').type('{enter}');
        });

        it('should call removed callback with removed tag as argument when removing a tag', () => {
            callback.removed = (param) => {
                expect(callback.removed).to.have.calledWith(param);
            };
            cy.spy(callback, 'removed');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.get('#tags').type('tag1').type('tag2').type(',');
            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('{backspace}').type('{backspace}');
        });

        it('should not call removed callback when trying to remove tags but has no tags', () => {
            callback.removed = (param) => {
                expect(callback.removed).not.to.have.calledWith(param);
            };
            cy.spy(callback, 'removed');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('{backspace}').type('{backspace}');
        });

        it('should call maxlengthExceeded callback when reaching input maxlength limit', () => {
            callback.maxlengthExceeded = () => {
                expect(callback.maxlengthExceeded).to.be.called;
            };
            cy.spy(callback, 'maxlengthExceeded');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.get('#tags').invoke('attr', 'maxlength', '10');

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);

            cy.get('#tags').type('senhoru').type(',').type('vasco').type(',').type('thiago');
        });

        it('should call maxlengthExceeded callback when reaching input maxlength limit', () => {
            callback.maxlengthExceeded = () => {
                expect(callback.maxlengthExceeded).to.be.called;
            };
            cy.spy(callback, 'maxlengthExceeded');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.get('#tags').invoke('attr', 'maxlength', '20');

            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            cy.get('#tags').type('senhoru').type(',').type('vasco').type(',').type('thiago').type(',');
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);
        });

        it('should not call maxlengthExceeded callback when loading', () => {
            callback.maxlengthExceeded = () => {
                console.log('here 3');
                expect(callback.maxlengthExceeded).not.to.be.called;
            };
            cy.spy(callback, 'maxlengthExceeded');

            win.define(['doc', 'tag'], ($, t) => tag = t);

            cy.get('#tags').type('senhoru').type(',').type('vasco').type(',').type('thiago').type(',');
            cy.get('#tags').invoke('attr', 'maxlength', '20');
            cy.spy(tag, 'tagify');
            let args = ['#tags', callback];
            tag.tagify(...args);
            expect(tag.tagify).to.have.calledOnce;
            expect(tag.tagify).to.be.calledWithExactly(...args);
        });
    });
});
